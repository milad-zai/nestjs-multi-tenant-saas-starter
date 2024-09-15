import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tenant } from './tenant.schema';
import { Model } from 'mongoose';
import CreateCompanyDto from './create-company.dto';
import { nanoid } from 'nanoid';
import { AuthService } from 'src/auth/auth.service';
import { UserTenantMappingService } from 'src/user-tenant-mapping/user-tenant-mapping.service';
import { TenantConnectionService } from 'src/services/tenant-connection.service';
import { User, UserSchema } from 'src/users/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TenantsService {
  private readonly logger = new Logger(TenantsService.name);

  constructor(
    @InjectModel(Tenant.name)
    private TenantModel: Model<Tenant>,
    private userTenantMappingService: UserTenantMappingService,
    private authService: AuthService,
    private tenantConnectionService: TenantConnectionService
  ) {}

  async getTenantById(tenantId: string) {
    return this.TenantModel.findOne({ tenantId });
  }

  async createCompany(companyData: CreateCompanyDto) {
    // Step 1: Check if user already exists
    const user = await this.userTenantMappingService.getUserByEmail(
      companyData.user.email
    );

    if (user) {
      throw new BadRequestException('User exists and belongs to a company...');
    }

    const session = await this.TenantModel.db.startSession();
    session.startTransaction(); // Start transaction to ensure atomicity

    try {
      // Step 2: Create a tenant ID
      const tenantId = nanoid(12);
      this.logger.log(`Generated tenant ID: ${tenantId}`);

      // Step 3: Create a tenant record in master DB
      await this.TenantModel.create(
        [{ companyName: companyData.companyName, tenantId }],
        { session }
      );
      this.logger.log('Tenant record created successfully.');

      // Step 4: Create user-tenant mapping in master DB (within the same transaction)
      await this.userTenantMappingService.create(
        { email: companyData.user.email, tenantId },
        session
      );
      this.logger.log('User-tenant mapping created successfully.');

      // Step 5: Create tenant secret key (tenant-specific DB)
      try {
        await this.authService.createSecretKeyForNewTenant(tenantId);
        this.logger.log('Secret key created for tenant.');
      } catch (error) {
        this.logger.error(
          'Error creating tenant secret key. Rolling back...',
          error
        );
        await session.abortTransaction(); // Rollback master DB changes
        throw new InternalServerErrorException(
          'Failed to create tenant secret key'
        );
      }

      // Step 6: Create tenant-specific user model (tenant-specific DB)
      try {
        const UsersModel = await this.tenantConnectionService.getTenantModel(
          { name: User.name, schema: UserSchema },
          tenantId
        );
        companyData.user.password = await bcrypt.hash(
          companyData.user.password,
          10
        );
        await UsersModel.create([{ ...companyData.user, tenantId }]);
        this.logger.log('User created in tenant-specific database.');
      } catch (error) {
        this.logger.error(
          'Error creating user in tenant-specific DB. Rolling back...',
          error
        );
        await session.abortTransaction(); // Rollback master DB changes

        //remove tenant database
        try {
          await this.authService.removeSecretKeyForTenant(tenantId);
        } catch (error) {
          this.logger.error('Error removing tenant secret key.', error);
        }

        throw new InternalServerErrorException(
          'Failed to create user in tenant-specific DB'
        );
      }

      // Commit transaction if all steps succeed
      await session.commitTransaction();
    } catch (error) {
      // Rollback transaction on error
      await session.abortTransaction();
      this.logger.error(`Error creating company: ${error.message}`);
      throw new InternalServerErrorException(
        error.message || 'Error occurred while creating company and user.'
      );
    } finally {
      session.endSession();
    }
  }
}

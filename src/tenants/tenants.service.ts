import { BadRequestException, Injectable } from '@nestjs/common';
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
    //Verify user does not already exist
    const user = await this.userTenantMappingService.getUserByEmail(
      companyData.user.email
    );

    console.log('user', user);

    if (user) {
      throw new BadRequestException('User exists and belongs to a company...');
    }

    //Create a tenant Id
    const tenantId = nanoid(12);
    console.log(tenantId);

    //Create a tenant secret
    await this.authService.createSecretKeyForNewTenant(tenantId);

    console.log('secret key created');

    //Create Tenant Record
    await this.TenantModel.create({
      companyName: companyData.companyName,
      tenantId,
    });

    console.log('Tenant created');

    //Create userTenantMapping record
    await this.userTenantMappingService.create({
      email: companyData.user.email,
      tenantId,
    });

    //Create tenant specific user
    const UsersModel = await this.tenantConnectionService.getTenantModel(
      {
        name: User.name,
        schema: UserSchema,
      },
      tenantId
    );

    //Store the encrypted secret key
    companyData.user.password = await bcrypt.hash(
      companyData.user.password,
      10
    );
    await UsersModel.create({ ...companyData.user, tenantId });
  }
}

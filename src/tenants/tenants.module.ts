import { Global, Module } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Tenant, TenantSchema } from './tenant.schema';
import { UsersModule } from 'src/users/users.module';
import { TenantsController } from './tenants.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UserTenantMappingModule } from 'src/user-tenant-mapping/user-tenant-mapping.module';
import { TenantConnectionService } from 'src/services/tenant-connection.service';

@Global()
@Module({
  imports: [
    UserTenantMappingModule,
    UsersModule,
    AuthModule,
    MongooseModule.forFeature([
      {
        name: Tenant.name,
        schema: TenantSchema,
      },
    ]),
  ],
  controllers: [TenantsController],
  providers: [TenantsService, TenantConnectionService],
  exports: [TenantsService],
})
export class TenantsModule {}

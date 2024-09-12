import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TenantConnectionService } from 'src/services/tenant-connection.service';
import { UserTenantMappingModule } from 'src/user-tenant-mapping/user-tenant-mapping.module';

@Module({
  imports: [UserTenantMappingModule],
  controllers: [AuthController],
  providers: [AuthService, TenantConnectionService],
  exports: [AuthService],
})
export class AuthModule {}

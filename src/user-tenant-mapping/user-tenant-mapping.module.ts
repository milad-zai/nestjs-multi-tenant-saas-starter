import { Module } from '@nestjs/common';
import { UserTenantMappingService } from './user-tenant-mapping.service';
import { UserTenantMappingController } from './user-tenant-mapping.controller';
import { MongooseModule } from '@nestjs/mongoose';
import UserTenantMapping, {
  UserTenantMappingSchema,
} from './schema/user-tenant-mapping.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserTenantMapping.name,
        schema: UserTenantMappingSchema,
      },
    ]),
  ],
  controllers: [UserTenantMappingController],
  providers: [UserTenantMappingService],
  exports: [UserTenantMappingService],
})
export class UserTenantMappingModule {}

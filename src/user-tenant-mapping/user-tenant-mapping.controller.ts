import { Controller, Get, Param, Delete } from '@nestjs/common';
import { UserTenantMappingService } from './user-tenant-mapping.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User Tenant Mapping')
@Controller('user-tenant-mapping')
export class UserTenantMappingController {
  constructor(
    private readonly userTenantMappingService: UserTenantMappingService
  ) {}

  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.userTenantMappingService.findOne(email);
  }

  @Delete(':email')
  remove(@Param('email') email: string) {
    return this.userTenantMappingService.remove(email);
  }
}

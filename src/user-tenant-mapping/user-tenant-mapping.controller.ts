import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UserTenantMappingService } from './user-tenant-mapping.service';
import { CreateUserTenantMappingDto } from './dto/create-user-tenant-mapping.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User Tenant Mapping')
@Controller('user-tenant-mapping')
export class UserTenantMappingController {
  constructor(
    private readonly userTenantMappingService: UserTenantMappingService
  ) {}

  @Post()
  create(@Body() createUserTenantMappingDto: CreateUserTenantMappingDto) {
    return this.userTenantMappingService.create(createUserTenantMappingDto);
  }

  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.userTenantMappingService.findOne(email);
  }

  @Delete(':email')
  remove(@Param('email') email: string) {
    return this.userTenantMappingService.remove(email);
  }
}

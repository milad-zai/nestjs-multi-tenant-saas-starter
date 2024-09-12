import { ApiProperty } from '@nestjs/swagger';

export class CreateUserTenantMappingDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  tenantId: string;
}

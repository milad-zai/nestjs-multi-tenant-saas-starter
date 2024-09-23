import { ApiProperty } from '@nestjs/swagger';
import CreateUserDto from 'src/users/dto/create-user.dto';

export default class CreateCompanyDto {
  @ApiProperty()
  readonly companyName: string;

  @ApiProperty()
  readonly user: CreateUserDto;
}

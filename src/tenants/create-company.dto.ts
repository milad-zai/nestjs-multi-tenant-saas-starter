import { ApiProperty } from '@nestjs/swagger';
import UserDto from 'src/users/user.dto';

export default class CreateCompanyDto {
  @ApiProperty()
  readonly companyName: string;

  @ApiProperty()
  readonly user: UserDto;
}

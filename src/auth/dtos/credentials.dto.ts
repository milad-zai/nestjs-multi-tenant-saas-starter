import { ApiProperty } from '@nestjs/swagger';

export default class CredentialsDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import CredentialsDto from './dtos/credentials.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() credentials: CredentialsDto) {
    return this.authService.login(credentials);
  }
}

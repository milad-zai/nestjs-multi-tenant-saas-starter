import { Body, Controller, Post } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import CreateCompanyDto from './create-company.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';

@ApiTags('Tenants')
@Controller('tenants')
export class TenantsController {
  constructor(
    private readonly tenantsService: TenantsService,
    private authService: AuthService
  ) {}

  @Post('create-company')
  async createCompany(@Body() createCompanyDTO: CreateCompanyDto) {
    const originalUser = { ...createCompanyDTO.user };

    await this.tenantsService.createCompany(createCompanyDTO);

    const { email, password } = originalUser;

    const { token, user: loggedUser } = await this.authService.login({
      email,
      password,
    });

    const { firstName, lastName, tenantId, email: userEmail } = loggedUser;

    return {
      token,
      user: {
        firstName,
        lastName,
        userEmail,
        tenantId,
      },
    };
  }
}

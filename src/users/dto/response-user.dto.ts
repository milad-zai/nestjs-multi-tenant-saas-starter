import { PersonalDetailsDto } from './personal-details.dto';
import { CompanyDetailsDto } from './company-details.dto';
import { Expose, Type } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  readonly _id: string;

  @Expose()
  readonly tenantId: string;

  @Expose()
  readonly firstName: string;

  @Expose()
  readonly lastName: string;

  @Expose()
  readonly email: string;

  @Expose()
  readonly isActive: boolean;

  @Expose()
  @Type(() => PersonalDetailsDto)
  readonly personalDetails?: PersonalDetailsDto;

  @Expose()
  @Type(() => CompanyDetailsDto)
  readonly companyDetails?: CompanyDetailsDto;
}

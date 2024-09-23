import {
  IsOptional,
  IsString,
  IsBoolean,
  ValidateNested,
  IsEmail,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PersonalDetailsDto } from './personal-details.dto';
import { CompanyDetailsDto } from './company-details.dto';
import { ApiProperty } from '@nestjs/swagger';

export default class PatchUserDto {
  @ApiProperty()
  @ValidateNested()
  @Type(() => PersonalDetailsDto)
  @IsOptional()
  personalDetails?: PersonalDetailsDto;

  @ApiProperty()
  @ValidateNested()
  @Type(() => CompanyDetailsDto)
  @IsOptional()
  companyDetails?: CompanyDetailsDto;

  @ApiProperty()
  @IsOptional()
  @IsString()
  tenantId?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

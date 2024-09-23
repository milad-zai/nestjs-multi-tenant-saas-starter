import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CompanyDetailsDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  team?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  department?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  branch?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  role?: string;
}

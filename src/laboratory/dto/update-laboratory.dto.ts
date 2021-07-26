import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, Length } from 'class-validator';
import { CreateLaboratoryDto } from './create-laboratory.dto';

export class UpdateLaboratoryDto extends PartialType(CreateLaboratoryDto) {
  @IsNotEmpty()
  @ApiPropertyOptional()
  @IsOptional()
  name?: string;

  @IsNotEmpty()
  @ApiPropertyOptional()
  @IsOptional()
  address?: string;

  @IsNotEmpty()
  @ApiPropertyOptional()
  @IsOptional()
  number?: string;

  @IsOptional()
  @ApiPropertyOptional()
  complement?: string;

  @IsNotEmpty()
  @ApiPropertyOptional()
  @IsOptional()
  neighborhood?: string;

  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  city?: string;

  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  @Length(2, 2)
  state?: string;

  @IsNotEmpty()
  @IsOptional()
  zipCode?: string;
}

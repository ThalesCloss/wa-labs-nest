import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, Length } from 'class-validator';
export class CreateLaboratoryDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  number: string;

  @ApiPropertyOptional({ required: false })
  @IsOptional()
  complement: string;

  @ApiProperty()
  @IsNotEmpty()
  neighborhood: string;

  @ApiProperty()
  @IsNotEmpty()
  city: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(2, 2)
  state: string;

  @ApiProperty()
  @IsNotEmpty()
  zipCode: string;
}

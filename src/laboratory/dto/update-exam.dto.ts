import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateExamDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}

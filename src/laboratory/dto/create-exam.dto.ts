import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { ExamType } from '../entities/exam.entity';

export class CreateExamDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsEnum(ExamType)
  @ApiProperty({ enum: ExamType })
  @IsNotEmpty()
  type: ExamType;
}

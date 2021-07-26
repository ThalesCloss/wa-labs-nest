import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  ParseUUIDPipe,
  Put,
  Query,
} from '@nestjs/common';
import { ExamService } from '../services/exam.service';
import { CreateExamDto } from '../dto/create-exam.dto';
import { UpdateExamDto } from '../dto/update-exam.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Exams')
@Controller('exams')
@UsePipes(ValidationPipe)
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Post()
  create(@Body() createExamDto: CreateExamDto) {
    return this.examService.create(createExamDto);
  }

  @Get()
  findAllActives() {
    return this.examService.findAllActives();
  }
  @Get('/all')
  findAll() {
    return this.examService.findAll();
  }
  @Get('/search')
  search(@Query('query') query: string) {
    return this.examService.searchExam(query);
  }

  @Get(':uuid')
  findOne(@Param('uuid', ParseUUIDPipe) id: string) {
    return this.examService.findOne(id);
  }

  @Put(':uuid')
  @UsePipes(ValidationPipe)
  update(
    @Param('uuid', ParseUUIDPipe) id: string,
    @Body() updateExamDto: UpdateExamDto,
  ) {
    return this.examService.update(id, updateExamDto);
  }

  @Delete(':uuid')
  remove(@Param('uuid', ParseUUIDPipe) id: string) {
    return this.examService.remove(id);
  }
  @Post(':uuid')
  activate(@Param('uuid', ParseUUIDPipe) id: string) {
    return this.examService.activate(id);
  }
}

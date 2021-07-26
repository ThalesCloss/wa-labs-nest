import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  ParseUUIDPipe,
  ParseArrayPipe,
} from '@nestjs/common';
import { LaboratoryService } from '../services/laboratory.service';
import { CreateLaboratoryDto } from '../dto/create-laboratory.dto';
import { UpdateLaboratoryDto } from '../dto/update-laboratory.dto';
import { LaboratoriesExamsService } from '../services/laboratories-exams.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Laboratories')
@Controller('laboratories')
export class LaboratoryController {
  constructor(
    private readonly laboratoryService: LaboratoryService,
    private readonly laboratoriesExamsService: LaboratoriesExamsService,
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  @ApiOperation({
    summary: 'Criação de um novo Laboratório',
    description:
      'As informações do Laboratório são validadas, em caso de sucesso um novo laboratório é criado com status ativo e retornado no corpo da resposta',
  })
  @ApiResponse({
    status: 201,
    description: 'Laboratório criado',
  })
  @ApiResponse({
    status: 400,
    description: 'Erro nas informações fornecidas para cadastro do Laboratório',
  })
  create(@Body() createLaboratoryDto: CreateLaboratoryDto) {
    return this.laboratoryService.create(createLaboratoryDto);
  }

  @Get('/all')
  @ApiOperation({
    summary: 'Consulta todos os Laboratórios',
    description:
      'Todos os Laboratórios cadastrados são retornados, independente do status',
  })
  findAll() {
    return this.laboratoryService.findAll();
  }

  @Get()
  @ApiOperation({
    summary: 'Consulta os Laboratórios ativos',
    description:
      'Somente os Laboratórios ativos são retornados por este endpoint',
  })
  findAllActives() {
    return this.laboratoryService.findAllActives();
  }

  @Get(':uuid')
  @ApiResponse({
    status: 200,
    description: 'Laboratório localizado',
  })
  @ApiResponse({
    status: 404,
    description: 'Laboratório não encontrado',
  })
  @ApiOperation({
    summary: 'Consulta um Laboratório específico',
    description:
      'Retorna o Laboratório do UUID informado no parâmetro da requisição',
  })
  findOne(@Param('uuid', ParseUUIDPipe) id: string) {
    return this.laboratoryService.findOne(id);
  }

  @Patch(':uuid')
  @ApiResponse({
    status: 200,
    description: 'Laboratório atualizado',
  })
  @ApiResponse({
    status: 400,
    description:
      'Erro nas informações fornecidas para atualização do Laboratório',
  })
  @ApiResponse({
    status: 404,
    description: 'Laboratório não encontrado',
  })
  @ApiOperation({
    summary: 'Atualizar um Laboratório',
    description:
      'Atualiza os campos passados no corpo da requisição para um Laboratório especificado pelo UUID',
  })
  @UsePipes(ValidationPipe)
  update(
    @Param('uuid', ParseUUIDPipe) id: string,
    @Body() updateLaboratoryDto: UpdateLaboratoryDto,
  ) {
    return this.laboratoryService.update(id, updateLaboratoryDto);
  }

  @Delete(':uuid')
  @ApiResponse({
    status: 404,
    description: 'Laboratório não encontrado',
  })
  @ApiOperation({
    summary: 'Desativa um laboratório',
  })
  remove(@Param('uuid', ParseUUIDPipe) id: string) {
    return this.laboratoryService.remove(id);
  }

  @Post(':uuid')
  @ApiResponse({
    status: 404,
    description: 'Laboratório não encontrado',
  })
  @ApiOperation({
    summary: 'Ativa um laboratório inativo',
  })
  activate(@Param('uuid', ParseUUIDPipe) id: string) {
    return this.laboratoryService.activate(id);
  }

  @ApiOperation({
    summary: 'Associa exames a um Laboratório',
  })
  @Post(':uuid/exams')
  @ApiBody({
    isArray: true,
    required: true,
    type: String,
    description: 'UUID dos exames a serem associados ao Laboratório',
  })
  connectExams(
    @Param('uuid', ParseUUIDPipe) id: string,
    @Body(new ParseArrayPipe())
    examIds: string[],
  ) {
    return this.laboratoriesExamsService.connectExamsToLaboratory(id, examIds);
  }

  @ApiOperation({
    summary: 'Associa um exame a um Laboratório',
  })
  @Post(':uuid/exams/:examUuid')
  connectExam(
    @Param('uuid', ParseUUIDPipe) id: string,
    @Param('examUuid', ParseUUIDPipe) exam: string,
  ) {
    return this.laboratoriesExamsService.connectExamsToLaboratory(id, [exam]);
  }

  @ApiOperation({
    summary: 'Desassocia exames de um Laboratório',
    description: 'Desassocia um ou mais exames ativos de um laboratório ativo',
  })
  @Delete(':uuid/exams/:exams')
  removeExams(
    @Param('uuid', ParseUUIDPipe) id: string,
    @Param('exams', new ParseArrayPipe({ separator: ',' })) examIds: string[],
  ) {
    return this.laboratoriesExamsService.removeExamesFromLaboratory(
      id,
      examIds,
    );
  }
}

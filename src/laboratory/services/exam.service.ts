import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreateExamDto } from '../dto/create-exam.dto';
import { UpdateExamDto } from '../dto/update-exam.dto';
import { Exam } from '../entities/exam.entity';

@Injectable()
export class ExamService {
  constructor(
    @InjectRepository(Exam) private readonly examRepository: Repository<Exam>,
  ) {}
  create(createExamDto: CreateExamDto) {
    const exam = new Exam();
    exam.name = createExamDto.name;
    exam.type = createExamDto.type;
    return this.examRepository.save(exam);
  }

  findAllActives() {
    return this.examRepository.find({ where: { isActive: true } });
  }

  findAll() {
    return this.examRepository.find();
  }

  findOne(id: string) {
    return this.findExam(id);
  }

  async update(id: string, updateExamDto: UpdateExamDto) {
    const exam = await this.findExam(id);
    exam.name = updateExamDto.name;
    return this.examRepository.save(exam);
  }

  async remove(id: string) {
    const exam = await this.findExam(id);
    exam.isActive = false;
    return this.examRepository.save(exam);
  }

  private async findExam(id: string) {
    const exam = this.examRepository.findOne(id);
    if (!exam)
      throw new NotFoundException(
        'O exame solicitado não existe',
        'Exame não encontrado',
      );
    return exam;
  }

  async activate(id: string) {
    const exam = await this.findExam(id);
    exam.isActive = true;
    return this.examRepository.save(exam);
  }

  async searchExam(query: string) {
    return this.examRepository.find({
      relations: ['laboratories'],
      where: {
        name: ILike(`${query}%`),
      },
    });
  }
}

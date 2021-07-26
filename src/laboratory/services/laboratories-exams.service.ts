import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exam } from '../entities/exam.entity';
import { In, Repository } from 'typeorm';
import { Laboratory } from '../entities/laboratory.entity';

@Injectable()
export class LaboratoriesExamsService {
  constructor(
    @InjectRepository(Laboratory)
    private readonly laboratoryRepository: Repository<Laboratory>,
    @InjectRepository(Exam)
    private readonly examsRepository: Repository<Exam>,
  ) {}

  async connectExamsToLaboratory(laboratoryId: string, examIds: string[]) {
    const laboratory = await this.getAvailableLaboratory(laboratoryId);
    const exams = await this.getAvailableExams(examIds);
    laboratory.exams.push(...exams);
    return this.laboratoryRepository.save(laboratory);
  }

  async removeExamesFromLaboratory(laboratoryId: string, examIds: string[]) {
    const laboratory = await this.getAvailableLaboratory(laboratoryId);

    await this.getAvailableExams(examIds);

    laboratory.exams = laboratory.exams.filter(
      (exam) => !examIds.includes(exam.uuid),
    );

    this.laboratoryRepository.save(laboratory);
  }

  async getAvailableLaboratory(laboratoryId: string) {
    const laboratory = await this.laboratoryRepository.findOne(laboratoryId, {
      relations: ['exams'],
    });
    if (!laboratory || !laboratory.isActive)
      throw new NotFoundException(
        'O laboratório informado não está disponível para alteração de exames',
        'Laboratório indisponível',
      );
    return laboratory;
  }

  async getAvailableExams(examIds: string[]) {
    examIds = Array.from(new Set(examIds));
    const [exams, count] = await this.examsRepository.findAndCount({
      where: { uuid: In(examIds), isActive: true },
    });
    if (count !== examIds.length) {
      const foundExams = exams.map((exam) => exam.uuid);
      const notFoundExams = examIds.filter(
        (exam) => !foundExams.includes(exam),
      );
      throw new NotFoundException(
        `O(s) exame(s) ${notFoundExams.concat(
          ',',
        )} não existe(m) ou está(ão) inativo(s)`,
        'Exame(s) indisponível(is)',
      );
    }
    return exams;
  }
}

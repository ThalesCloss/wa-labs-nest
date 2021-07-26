import { Module } from '@nestjs/common';
import { LaboratoryService } from './services/laboratory.service';
import { LaboratoryController } from './controllers/laboratory.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Laboratory } from './entities/laboratory.entity';
import { LaboratoriesExamsService } from './services/laboratories-exams.service';
import { ExamController } from './controllers/exam.controller';
import { ExamService } from './services/exam.service';
import { Exam } from './entities/exam.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Laboratory, Exam])],
  controllers: [LaboratoryController, ExamController],
  providers: [LaboratoryService, LaboratoriesExamsService, ExamService],
})
export class LaboratoryModule {}

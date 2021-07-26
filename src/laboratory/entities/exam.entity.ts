import { Laboratory } from './laboratory.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum ExamType {
  IMAGE = 'image',
  ANALYZE = 'analyze',
}

@Entity()
export class Exam {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;
  @Column()
  name: string;

  @Column({ type: 'enum', enum: ExamType })
  type: ExamType;

  @Column({ default: true })
  isActive: boolean;

  @ManyToMany(() => Laboratory, (laboratory) => laboratory.exams)
  laboratories: Laboratory[];
}

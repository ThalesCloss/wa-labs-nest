import { Exam } from './exam.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Address } from './address';

@Entity()
export class Laboratory {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  name: string;

  @Column({ default: true })
  isActive: boolean;

  @Column(() => Address)
  address: Address;

  @ManyToMany(() => Exam, (exam) => exam.laboratories)
  @JoinTable()
  exams: Exam[];
}

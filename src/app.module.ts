import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LaboratoryModule } from './laboratory/laboratory.module';

@Module({
  imports: [TypeOrmModule.forRoot(), LaboratoryModule],
})
export class AppModule {}

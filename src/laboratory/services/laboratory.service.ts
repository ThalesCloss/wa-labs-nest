import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLaboratoryDto } from '../dto/create-laboratory.dto';
import { UpdateLaboratoryDto } from '../dto/update-laboratory.dto';
import { Address } from '../entities/address';
import { Laboratory } from '../entities/laboratory.entity';

@Injectable()
export class LaboratoryService {
  constructor(
    @InjectRepository(Laboratory)
    private readonly laboratoryRepository: Repository<Laboratory>,
  ) {}

  create(createLaboratoryDto: CreateLaboratoryDto) {
    const laboratory = new Laboratory();
    const address = new Address({
      ...createLaboratoryDto,
      description: createLaboratoryDto.address,
    });
    laboratory.name = createLaboratoryDto.name;
    laboratory.address = address;
    return this.laboratoryRepository.save(laboratory);
  }

  findAll() {
    return this.laboratoryRepository.find();
  }
  findAllActives() {
    return this.laboratoryRepository.find({ where: { isActive: true } });
  }

  findOne(id: string) {
    return this.findLaboratory(id);
  }

  async update(id: string, updateLaboratoryDto: UpdateLaboratoryDto) {
    const laboratory = await this.findLaboratory(id);
    laboratory.name = updateLaboratoryDto.name ?? laboratory.name;
    const updateAddress = {
      ...updateLaboratoryDto,
      description: updateLaboratoryDto.address,
    };
    const address = new Address({ ...laboratory.address, ...updateAddress });
    laboratory.address = address;
    return this.laboratoryRepository.save(laboratory);
  }

  async remove(id: string) {
    const laboratory = await this.findLaboratory(id);
    laboratory.isActive = false;
    return this.laboratoryRepository.save(laboratory);
  }

  async activate(id: string) {
    const laboratory = await this.findLaboratory(id);
    laboratory.isActive = true;
    return this.laboratoryRepository.save(laboratory);
  }

  private async findLaboratory(id: string) {
    const laboratory = await this.laboratoryRepository.findOne(id, {
      relations: ['exams'],
    });
    if (!laboratory)
      throw new NotFoundException('O laboratório solicitado não existe');
    return laboratory;
  }
}

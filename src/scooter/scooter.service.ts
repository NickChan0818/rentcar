import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateScooterDto } from './dto/scooter.dto';
import { Scooter } from './entities/scooter.entity';

@Injectable()
export class ScooterService {
  constructor(
    @InjectRepository(Scooter)
    private readonly scooterRepository: Repository<Scooter>,
  ) {}

  async create(createScooterDto: CreateScooterDto): Promise<Scooter> {
    const scooter = this.scooterRepository.create(createScooterDto);
    return this.scooterRepository.save(scooter);
  }

  async findAll(isRentting?: boolean): Promise<Scooter[]> {
    if (isRentting !== undefined) {
      return this.scooterRepository.find({ where: { isRentting } });
    }
    return this.scooterRepository.find();
  }

  async findOne(id: number): Promise<Scooter> {
    const scooter = await this.scooterRepository.findOne({ where: { id } });
    if (!scooter) {
      throw new NotFoundException(`Scooter with id ${id} not found`);
    }
    return scooter;
  }
}

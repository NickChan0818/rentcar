import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRentDto } from './dto/rent.dto';
import { Rent } from './entities/rent.entity';
import { Scooter } from '../scooter/entities/scooter.entity';

@Injectable()
export class RentService {
  constructor(
    @InjectRepository(Rent)
    private readonly rentRepository: Repository<Rent>,
    @InjectRepository(Scooter)
    private readonly scooterRepository: Repository<Scooter>,
  ) {}

  async create(createRentDto: CreateRentDto): Promise<Rent> {
    const scooter = await this.scooterRepository.findOne({
      where: { id: createRentDto.scooterId },
    });
    // TODO: Check user is not renting more than 1 scooter

    if (!scooter) {
      throw new BadRequestException(
        `Scooter with id ${createRentDto.scooterId} not found`,
      );
    }
    if (scooter.isRenting === true) {
      throw new BadRequestException(
        `Scooter with id ${createRentDto.scooterId} is already renting`,
      );
    }

    const rent = this.rentRepository.create({
      ...createRentDto,
      scooter,
      startTime: new Date(),
    });

    return this.rentRepository.save(rent);
  }

  async findAll(): Promise<Rent[]> {
    return this.rentRepository.find();
  }

  async findOne(id: number): Promise<Rent> {
    const rent = await this.rentRepository.findOne({ where: { id } });
    if (!rent) {
      throw new NotFoundException(`Rent with id ${id} not found`);
    }
    return rent;
  }

  async closeRent(id: number): Promise<Rent> {
    const rent = await this.rentRepository.findOne({ where: { id } });
    if (!rent) {
      throw new NotFoundException(`Rent with id ${id} not found`);
    }

    const scooter = await this.scooterRepository.findOne({
      where: { id: rent.scooter.id },
    });
    if (!scooter) {
      throw new InternalServerErrorException(`Scooter with id ${id} not found`);
    }
    if (scooter.isRenting === false) {
      throw new BadRequestException(`Scooter with id ${id} is not renting`);
    }

    scooter.isRenting = false;
    await this.scooterRepository.save(scooter);

    rent.endTime = new Date();
    return this.rentRepository.save({ ...rent });
  }
}

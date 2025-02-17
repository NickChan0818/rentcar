import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRentDto } from './dto/rent.dto';
import { Rent } from './entities/rent.entity';
import { Scooter } from '../scooter/entities/scooter.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class RentService {
  constructor(
    @InjectRepository(Rent)
    private readonly rentRepository: Repository<Rent>,
    @InjectRepository(Scooter)
    private readonly scooterRepository: Repository<Scooter>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createRentDto: CreateRentDto, userId: number): Promise<Rent> {
    const scooter = await this.scooterRepository.findOne({
      where: { id: createRentDto.scooterId },
    });
    if (!scooter) {
      throw new BadRequestException(`Scooter with id ${createRentDto.scooterId} not found`);
    }
    if (scooter.isRenting === true) {
      throw new BadRequestException(`Scooter with id ${createRentDto.scooterId} is already renting`);
    }

    // Check user is not renting more than 1 scooter
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['rents'],
    });
    if (!user) throw new BadRequestException(`User with id ${userId} not found`);
    const isRenting = user.rents.some((rent) => rent.endTime === null);
    if (isRenting) throw new BadRequestException(`User with id ${userId} is already renting a scooter`);

    const rent = this.rentRepository.create({
      scooter,
      user,
      startTime: new Date(),
    });
    scooter.isRenting = true;
    await this.scooterRepository.save(scooter);
    const savedRent = await this.rentRepository.save(rent);

    return savedRent;
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
    const rent = await this.rentRepository.findOne({ where: { id }, relations: ['scooter'] });
    if (!rent) {
      throw new NotFoundException(`Rent with id ${id} not found`);
    }
    const scooter = rent.scooter;
    scooter.isRenting = false;
    await this.scooterRepository.save(scooter);

    rent.endTime = new Date();
    const updatedRent = await this.rentRepository.save(rent);
    return updatedRent;
  }
}

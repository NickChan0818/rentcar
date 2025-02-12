import { Injectable } from '@nestjs/common';
import { CreateScooterDto, UpdateScooterDto } from './dto/scooter.dto';

@Injectable()
export class ScooterService {
  create(createScooterDto: CreateScooterDto) {
    return `This action adds a new scooter ${JSON.stringify(createScooterDto)}`;
  }

  findAll() {
    return `This action returns all scooter`;
  }

  findOne(id: number) {
    return `This action returns a #${id} scooter`;
  }

  update(id: number, updateScooterDto: UpdateScooterDto) {
    return `This action updates a #${id}, ${JSON.stringify(updateScooterDto)} scooter`;
  }

  remove(id: number) {
    return `This action removes a #${id} scooter`;
  }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentService } from './rent.service';
import { RentController } from './rent.controller';
import { Rent } from './entities/rent.entity';
import { Scooter } from '../scooter/entities/scooter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rent, Scooter])],
  controllers: [RentController],
  providers: [RentService],
})
export class RentModule {}

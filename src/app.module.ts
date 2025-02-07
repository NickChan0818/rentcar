import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { RentModule } from './rent/rent.module';
import { ScooterModule } from './scooter/scooter.module';
import { UsersController } from './users/users.controller';
import { ScooterController } from './scooter/scooter.controller';
import { RentController } from './rent/rent.controller';
import { UsersService } from './users/users.service';
import { ScooterService } from './scooter/scooter.service';
import { RentService } from './rent/rent.service';

@Module({
  imports: [UsersModule, RentModule, ScooterModule],
  controllers: [UsersController, ScooterController, RentController],
  providers: [UsersService, ScooterService, RentService],
})
export class AppModule {}

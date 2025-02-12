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
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Scooter } from './scooter/entities/scooter.entity';
import { Rent } from './rent/entities/rent.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [User, Scooter, Rent],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    RentModule,
    ScooterModule,
  ],
  controllers: [UsersController, ScooterController, RentController],
  providers: [UsersService, ScooterService, RentService],
})
export class AppModule {}

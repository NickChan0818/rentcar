import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { RentModule } from './rent/rent.module';
import { ScooterModule } from './scooter/scooter.module';
import { User } from './users/entities/user.entity';
import { Scooter } from './scooter/entities/scooter.entity';
import { Rent } from './rent/entities/rent.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
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
    AuthModule,
  ],
})
export class AppModule {}

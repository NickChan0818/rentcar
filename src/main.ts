import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource, Repository } from 'typeorm';
import { getDataSourceToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth/auth.guard';
import { Scooter } from './scooter/entities/scooter.entity';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(new AuthGuard(app.get(JwtService), app.get(Reflector)));
  await app.listen(process.env.PORT ?? 3000);
  console.log('Server is running on: http://localhost:3000');

  // 檢查數據庫連接狀態
  const dataSource = app.get<DataSource>(getDataSourceToken());
  if (dataSource.isInitialized) {
    console.log('pgweb: http://localhost:8081');

    // scooter檢查並插入資料
    const scooterRepository: Repository<Scooter> = dataSource.getRepository(Scooter);
    const scooterCount = await scooterRepository.count();
    if (scooterCount === 0) {
      const scooters = [{ isRenting: false }, { isRenting: false }, { isRenting: false }];
      await scooterRepository.save(scooters);
    }
  } else {
    console.error('Failed to connect to the database');
  }
}
void bootstrap();

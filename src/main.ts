import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { getDataSourceToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(new AuthGuard(app.get(JwtService), app.get(Reflector)));
  await app.listen(process.env.PORT ?? 3000);
  console.log('Server is running on: http://localhost:3000');

  // 檢查數據庫連接狀態
  const dataSource = app.get<DataSource>(getDataSourceToken());
  if (dataSource.isInitialized) {
    console.log('Database connection established successfully');
    console.log('pgweb: http://localhost:8081');
  } else {
    console.error('Failed to connect to the database');
  }
}
void bootstrap();

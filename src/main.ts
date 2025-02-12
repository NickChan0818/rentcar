import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { getDataSourceToken } from '@nestjs/typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  console.log('Server is running on: http://localhost:3000');

  // 檢查數據庫連接狀態
  const dataSource = app.get<DataSource>(getDataSourceToken());
  if (dataSource.isInitialized) {
    console.log('Database connection established successfully');
  } else {
    console.error('Failed to connect to the database');
  }
}
void bootstrap();

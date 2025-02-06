import { Controller, Get, Post } from '@nestjs/common';

@Controller('scooter')
export class ScooterController {
  @Get()
  getAllScooter(): void {}

  @Get('/:id')
  getScooter(): void {}

  @Post()
  addScooter(): void {}
}

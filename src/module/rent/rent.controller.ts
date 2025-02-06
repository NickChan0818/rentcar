import { Controller, Get, Post } from '@nestjs/common';

@Controller('rents')
export class RentController {
  @Get()
  getAllRent(): void {}

  @Get('/:id')
  getRent(): void {}

  @Post()
  addRent(): void {}
}

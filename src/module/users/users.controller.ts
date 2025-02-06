import { Controller, Get, Post } from '@nestjs/common';

@Controller('users')
export class UserController {
  @Get()
  getAllUser(): void {}

  @Get('/:id')
  getUser(): void {}

  @Post()
  addUser(): void {}
}

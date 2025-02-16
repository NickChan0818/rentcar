import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ScooterService } from './scooter.service';
import { CreateScooterDto } from './dto/scooter.dto';

@Controller('scooter')
export class ScooterController {
  constructor(private readonly scooterService: ScooterService) {}

  @Post()
  create(@Body() createScooterDto: CreateScooterDto) {
    return this.scooterService.create(createScooterDto);
  }

  @Get()
  findAll(@Query('isRenting') isRenting?: boolean) {
    return this.scooterService.findAll(isRenting);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scooterService.findOne(+id);
  }
}

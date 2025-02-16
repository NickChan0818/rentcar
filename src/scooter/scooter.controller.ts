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
  findAll(@Query('isRentting') isRentting?: boolean) {
    return this.scooterService.findAll(isRentting);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scooterService.findOne(+id);
  }
}

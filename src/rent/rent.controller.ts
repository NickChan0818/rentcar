import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { RentService } from './rent.service';
import { CreateRentDto } from './dto/rent.dto';

@Controller('rent')
export class RentController {
  constructor(private readonly rentService: RentService) {}

  @Post()
  create(@Body() createRentDto: CreateRentDto) {
    return this.rentService.create(createRentDto);
  }

  @Get()
  findAll() {
    return this.rentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rentService.findOne(+id);
  }

  @Post(':id')
  closeRent(@Param('id') id: string) {
    return this.rentService.closeRent(+id);
  }
}

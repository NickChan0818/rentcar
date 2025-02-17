import { Controller, Get, Post, Body, Param, Request } from '@nestjs/common';
import { RentService } from './rent.service';
import { CreateRentDto } from './dto/rent.dto';
import { validateId } from 'src/utils/utils';

@Controller('rent')
export class RentController {
  constructor(private readonly rentService: RentService) {}

  @Post()
  create(@Body() createRentDto: CreateRentDto, @Request() req: { user: { userId: number } }) {
    return this.rentService.create(createRentDto, req.user.userId);
  }

  @Get()
  findAll() {
    return this.rentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const rentId = validateId(id);
    return this.rentService.findOne(rentId);
  }

  @Post('/closeRent/:id')
  closeRent(@Param('id') id: string) {
    const rentId = validateId(id);
    return this.rentService.closeRent(rentId);
  }
}

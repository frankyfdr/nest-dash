import { Body, Controller, Get, Post } from '@nestjs/common';
import { PlaceTypesService } from './placeTypes.service';
import { CreateCategoryDto } from '../categories/dto/createCategory.dto';
import { CreatePlaceTypeDto } from './dto/createPlaceType.dto';

@Controller('place_types')
export class PlaceTypesController {
  constructor(private readonly placeTypesService: PlaceTypesService) {}

  @Post()
  async addPlaceType(@Body() createPlaceTypeDto: CreatePlaceTypeDto) {
    return this.placeTypesService.create(createPlaceTypeDto);
  }
  @Get()
  getCategories() {
    return this.placeTypesService.getAllTypes();
  }
}

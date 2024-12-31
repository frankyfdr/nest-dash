import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlaceTypeEntity } from '../PlaceTypes/entities/placeType.entity';
import { CreatePlaceTypeDto } from './dto/createPlaceType.dto';

@Injectable()
export class PlaceTypesService {
  constructor(
    @InjectRepository(PlaceTypeEntity)
    private placeTypeRepository: Repository<PlaceTypeEntity>,
  ) {}

  async create(
    createPlaceTypeDto: CreatePlaceTypeDto,
  ): Promise<PlaceTypeEntity> {
    const category = this.placeTypeRepository.create(createPlaceTypeDto);
    return this.placeTypeRepository.save(category);
  }
  async getAllTypes(): Promise<PlaceTypeEntity[]> {
    return this.placeTypeRepository.find();
  }

  async findByName(name: string): Promise<PlaceTypeEntity | undefined> {
    return this.placeTypeRepository.findOne({ where: { name } });
  }
}

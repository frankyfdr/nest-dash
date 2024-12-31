import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Place } from './entities/place.entity';
import { CreatePlaceDto } from './dto/createPlace.dto';
import { CategoriesService } from '../categories/categories.service';
import { PlaceTypesService } from '../PlaceTypes/placeTypes.service';
import { UsersService } from '../users/users.service';
import { UpdatePlaceDto } from './dto/updatePlace.dto';

@Injectable()
export class PlaceService {
  constructor(
    @InjectRepository(Place)
    private readonly placeRepository: Repository<Place>,
    private readonly categoryService: CategoriesService,
    private readonly placeTypeService: PlaceTypesService,
    private readonly usersService: UsersService,
  ) {}

  async createPlace(
    createPlaceDto: CreatePlaceDto,
    userEmail: string,
  ): Promise<Place> {
    const { name, location, imageUrl, placeType, category, cost } =
      createPlaceDto;

    const placeTypeEntity = await this.placeTypeService.findByName(placeType);
    if (!placeTypeEntity) {
      throw new Error(`Place type '${placeType}' does not exist.`);
    }

    const categoryEntity = await this.categoryService.findByName(category);
    if (!categoryEntity) {
      throw new Error(`Category '${category}' does not exist.`);
    }

    const user = await this.usersService.findOneByEmail(userEmail);
    if (!user) {
      throw new Error(`User not found.`);
    }

    const place = this.placeRepository.create({
      name,
      location,
      imageUrl,
      placeType: placeTypeEntity,
      category: categoryEntity,
      cost,
      createdBy: user.email,
      updatedBy: user.email,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return this.placeRepository.save(place);
  }
  async getAllPlaces(): Promise<Place[]> {
    const places = await this.placeRepository.find({
      order: { createdAt: 'ASC' },
    });

    if (!places || places.length === 0) {
      return [];
    }

    return places;
  }
  async getPlaceById(id: number): Promise<Place> {
    const place = await this.placeRepository.findOneBy({ id });

    if (!place) {
      throw new NotFoundException(`Place with ID ${id} does not exist.`);
    }

    return place;
  }

  async deletePlaceById(id: number): Promise<boolean> {
    const place = await this.placeRepository.findOneBy({ id });
    if (!place) {
      throw new NotFoundException(`Place with ID ${id} does not exist.`);
    }

    try {
      await this.placeRepository.delete(id);
      return true;
    } catch (error) {
      console.error(`Failed to delete place with ID ${id}:`, error);
      throw new InternalServerErrorException(
        `An error occurred while attempting to delete the place.`,
      );
    }
  }

  async updatePlace(
    id: number,
    updatePlaceDto: UpdatePlaceDto,
    updatedByEmail: string,
  ): Promise<Place> {
    const existingPlace = await this.getPlaceById(id);

    if (!existingPlace) {
      throw new NotFoundException(`Place with ID ${id} not found`);
    }
    Object.assign(existingPlace, updatePlaceDto);
    existingPlace.updatedBy = updatedByEmail;
    return this.placeRepository.save(existingPlace);
  }
}

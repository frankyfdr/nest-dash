import {
  Body,
  Controller,
  Get,
  Post,
  Headers,
  Param,
  ParseIntPipe,
  HttpStatus,
  Delete,
  HttpCode,
  UnauthorizedException,
  Patch,
  NotFoundException,
} from '@nestjs/common';
import { PlaceService } from './place.service';
import { CreatePlaceDto } from './dto/createPlace.dto';
import { JwtService } from '@nestjs/jwt';
import { Place } from './entities/place.entity';
import { UpdatePlaceDto } from './dto/updatePlace.dto';

@Controller('places')
export class PlacesController {
  constructor(
    private readonly placeService: PlaceService,
    private readonly jwtService: JwtService,
  ) {}
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createPlace(
    @Body() createPlaceDto: CreatePlaceDto,
    @Headers('Authorization') authHeader: string,
  ): Promise<Place> {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Missing or invalid Authorization header',
      );
    }
    const { location } = createPlaceDto;
    const [latitude, longitude] = location.split(',').map(Number);

    if (isNaN(latitude) || isNaN(longitude)) {
      throw new Error(
        'Invalid location format. Expected "latitude, longitude".',
      );
    }

    const token = authHeader.split(' ')[1];
    const geoJsonLocation = {
      type: 'Point',
      coordinates: [longitude, latitude],
    };
    try {
      const { email } = await this.jwtService.verifyAsync(token);
      createPlaceDto.location = geoJsonLocation;
      return this.placeService.createPlace(createPlaceDto, email);
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllPlaces(): Promise<Place[]> {
    const places = await this.placeService.getAllPlaces();
    if (!places || places.length === 0) {
      return [];
    }
    return places;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getPlaceById(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: number,
  ): Promise<Place> {
    return this.placeService.getPlaceById(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updatePlace(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: number, // Validate ID
    @Body() updatePlaceDto: UpdatePlaceDto,
    @Headers('Authorization') authHeader: string,
  ): Promise<Place> {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Missing or invalid Authorization header',
      );
    }

    const token = authHeader.split(' ')[1];

    try {
      const { email } = await this.jwtService.verifyAsync(token);

      const existingPlace = await this.placeService.getPlaceById(id);
      if (!existingPlace) {
        throw new NotFoundException(`Place with ID ${id} not found`);
      }

      return await this.placeService.updatePlace(id, updatePlaceDto, email);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Rethrow if the place isn't found
      }
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePlaceById(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: number,
  ): Promise<void> {
    await this.placeService.deletePlaceById(id);
  }
}

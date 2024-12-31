import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaceTypesController } from './placeTypes.controller';
import { PlaceTypeEntity } from './entities/placeType.entity';
import { PlaceTypesService } from './placeTypes.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlaceTypeEntity])],
  controllers: [PlaceTypesController],
  providers: [PlaceTypesService],
  exports: [PlaceTypesService],
})
export class PlaceTypeModule {}

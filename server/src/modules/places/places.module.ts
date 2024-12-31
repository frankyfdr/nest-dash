import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlacesController } from './places.controller';
import { PlaceService } from './place.service';
import { Place } from './entities/place.entity';
import { PlaceTypeModule } from '../PlaceTypes/placeTypes.module';
import { CategoriesModule } from '../categories/categories.module';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Place]),
    CategoriesModule,
    PlaceTypeModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [PlacesController],
  providers: [PlaceService],
})
export class PlacesModule {}

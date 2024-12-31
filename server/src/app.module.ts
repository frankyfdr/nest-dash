import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { envValidationSchema } from './config/env.validation';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { appConfig, databaseConfig, loggingConfig } from './config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './modules/categories/categories.module';
import { PlaceTypeModule } from './modules/PlaceTypes/placeTypes.module';
import { PlacesModule } from './modules/places/places.module';
import { databaseProvider } from './shared/database/database.provider';
import { DatabaseModule } from './shared/database/typeorm.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, loggingConfig],
      validationSchema: envValidationSchema,
      envFilePath: ['../.env'],
    }),
    AuthModule,
    UsersModule,
    CategoriesModule,
    PlaceTypeModule,
    PlacesModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

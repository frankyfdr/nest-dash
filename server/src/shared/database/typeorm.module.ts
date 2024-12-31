import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseProvider } from './database.provider';
import path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule available globally
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.name'),
        entities: [__dirname + '/../../modules/**/*.entity{.js,.ts}'],
        migrations: [__dirname + '/../../migrations/*{.js,.ts}'],
        synchronize: false, // Use migrations instead of sync
        logging: configService.get<boolean>('database.logging', true),
      }),
    }),
  ],
  providers: [...databaseProvider],
  exports: [...databaseProvider],
})
export class DatabaseModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // Use localhost to connect to Dockerized PostgreSQL
      port: 5432, // PostgresSQL default port
      username: 'postgres',
      password: 'postgres',
      database: 'nestjs_db',
      autoLoadEntities: true,
      synchronize: true, // Set false in production
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

export const databaseProvider = [
  {
    provide: 'DATA_SOURCE',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const entitiesPath = __dirname + '/../../modules/**/*.entity{.js,.ts}';
      const migrationsPath = __dirname + '/../../migrations/*{.js,.ts}';
      console.log('Resolved Entity Path:', entitiesPath);

      const isDevelopment =
        configService.get<string>('environment') === 'development';
      console.log('Environment:', configService.get<string>('environment'));

      const dataSource = new DataSource({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.name'),
        synchronize: isDevelopment,
        logging: true, // Enable logging for debugging
        entities: [entitiesPath],
        migrations: [migrationsPath],
      });

      try {
        console.log('Initializing DataSource...');
        await dataSource.initialize();
        console.log('DataSource initialized successfully.');
        console.log('Detected Migrations:', dataSource.migrations);
        const migrations = await dataSource.runMigrations();
        console.log('Migrations Applied:', migrations);
        console.log('Entities', dataSource.entityMetadatas);
        return dataSource;
      } catch (error) {
        console.error('Error initializing DataSource:', error);
        throw error;
      }
    },
  },
];

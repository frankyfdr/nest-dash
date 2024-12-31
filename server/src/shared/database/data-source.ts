const { DataSource } = require('typeorm');
const path = require('path');
require('dotenv').config();

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_NAME || 'nestjs_db',
  entities: [path.join(__dirname, '/../../modules/**/entities/*.entity.js')],
  migrations: [path.join(__dirname, '/../../migrations/*{.js}')],
  synchronize: false,
  logging: ['query', 'error'],
});

module.exports = dataSource;

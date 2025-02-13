import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';
import { registerAs } from '@nestjs/config';

dotenvConfig({ path: '.env.development' });

const config = {
  type: 'postgres',
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  autoLoadEntities: true,
<<<<<<< HEAD
  dropSchema: true,
  synchronize: process.env.NODE_ENV === 'production' ? false : true,
=======
  dropSchema: false,
  synchronize: true,
>>>>>>> c1d71ea21458e829175dbf5afe57cdf0232685be
  schema: 'public',
  logging: false,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
};
export default registerAs('typeorm', () => config);

export const conectionSource = new DataSource(config as DataSourceOptions);

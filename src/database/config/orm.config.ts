import { DataSourceOptions } from 'typeorm';
import { ConfigService } from '../../config/config.service';

const config = new ConfigService();

export const ormConfig: DataSourceOptions = {
  type: 'mysql',
  ...(config.inProduction
    ? { url: config.DB_URL }
    : {
        username: config.DB_USER,
        host: config.DB_HOST,
        password: config.DB_PASSWORD,
        port: config.DB_PORT,
        database: config.DB_NAME,
      }),
  entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
  synchronize: config.DB_SYNC,
  logging: !config.inProduction ? ['error', 'migration', 'warn'] : false,
};
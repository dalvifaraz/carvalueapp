import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'dpg-cgo8i48u9tun42o0llh0-a',
  port: 5432,
  username: 'carvalueapp_user',
  password: 'BN27TCbzf0pVONKqrR4bxN7f9hhsWva2',
  database: 'carvalueapp',
  synchronize: true,
  entities: ['**/*.entity.js'],
  migrations: ['./db/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;

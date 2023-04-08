import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'sqlite',
  database: 'db.sqlite',
  entities: ['**/*.entity.js'],
  synchronize: true,
  migrations: ['./db/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;

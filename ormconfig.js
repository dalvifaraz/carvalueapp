const dbConfig = {
  synchronize: true,
  migrations: ['migrations/*.js'],
  cli: {
    migrationsDir: 'migrations',
  },
};

switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'db.sqlite',
      entities: ['**/*.entity.js'],
    });
    break;
  case 'test':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'test.sqlite',
      entities: ['**/*.entity.ts'],
    });
    break;
  case 'production':
    Object.assign(dbConfig, {
      type: 'postgres',
      entities: ['**/*.entity.js'],
      url: 'dpg-cgo8i48u9tun42o0llh0-a',
      host: 'postgres://carvalueapp_user:BN27TCbzf0pVONKqrR4bxN7f9hhsWva2@dpg-cgo8i48u9tun42o0llh0-a/carvalueapp',
      port: '5432',
      database: 'carvalueapp',
      username: 'carvalueapp_user',
      password: 'BN27TCbzf0pVONKqrR4bxN7f9hhsWva2',
    });
    break;
  default:
    throw new Error('Unknown Environment');
}

module.exports = dbConfig;

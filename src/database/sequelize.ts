import { Sequelize } from 'sequelize-typescript';
import { get } from 'config';

export const sequelize = new Sequelize({
  username: get('databases.auth_postgres.user'),
  password: get('databases.auth_postgres.password'),
  database: get('databases.auth_postgres.database'),
  host: get('databases.auth_postgres.host'),
  dialect: 'postgres',
  modelPaths: [__dirname + '/models'],
  logging: false
});

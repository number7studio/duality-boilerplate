const config = require('config');

const sequelizeConfig = {
  "username": config.get('databases.auth_postgres.user'),
  "password": config.get('databases.auth_postgres.password'),
  "database": config.get('databases.auth_postgres.database'),
  "host": config.get('databases.auth_postgres.host'),
  "dialect": "postgres",
  "logging": false
}

module.exports = {
  "development": sequelizeConfig,
  "test": sequelizeConfig,
  "production": sequelizeConfig
}

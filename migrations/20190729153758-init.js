'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .sequelize
      .query(`CREATE TABLE users (
        id serial primary key,
        created_at timestamp default now(),
        updated_at timestamp default now(),
        deleted_at timestamp,
        first_name text
    )`)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface
      .sequelize
      .query('drop table users')
  }
};

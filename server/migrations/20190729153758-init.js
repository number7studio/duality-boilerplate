"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      BEGIN;
      CREATE TABLE public.users (
        id serial PRIMARY KEY,
        username character varying(255),
        created_at timestamp  DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp  DEFAULT CURRENT_TIMESTAMP,
        deleted_at timestamp
    );
    
    
    CREATE TABLE public.mood_entries (
        id serial PRIMARY KEY,
        user_id integer,
        created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
        deleted_at timestamp,
        FOREIGN KEY (user_id) REFERENCES users(id)
    );
    
    
    CREATE TABLE public.mood_entry_items (
        id bigserial PRIMARY KEY,
        mood character varying(255),
        rating integer,
        user_id integer,
        mood_entry_id integer,
        created_at timestamp   NOT NULL,
        updated_at timestamp  DEFAULT CURRENT_TIMESTAMP NOT NULL,
        deleted_at timestamp,
        FOREIGN KEY (user_id) REFERENCES users(id)
    );
    
    CREATE TABLE public.user_auth (
        id serial PRIMARY KEY,
        user_id integer,
        password character varying(255),
        created_at timestamp  DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp  DEFAULT CURRENT_TIMESTAMP,
        deleted_at timestamp,
        FOREIGN KEY (user_id) REFERENCES users(id)
    );
    
    CREATE TABLE public.user_roles (
        id serial PRIMARY KEY,
        user_id integer,
        role character varying(255),
        created_at timestamp  DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp  DEFAULT CURRENT_TIMESTAMP,
        deleted_at timestamp,
        FOREIGN KEY (user_id) REFERENCES users(id)
    );
    
    create index mood_entries_user_id on mood_entries(user_id);
    create index mood_entry_items_user_id on mood_entry_items(user_id);
    create index mood_entry_items_mood_entry_id on mood_entry_items(mood_entry_id);
    create index user_auth_user_id on user_auth(user_id);
    create index user_roles_user_id on user_roles(user_id);
    COMMIT;
    `);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      BEGIN;
        drop table mood_entry_items;
        drop table mood_entries;
        drop table user_auth;
        drop table user_roles;
        drop table users;
      COMMIT;
      `);
  }
};

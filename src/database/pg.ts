import { Pool } from 'pg';
import config from 'config';

const pool = new Pool({
  user: config.get('databases.auth_postgres.user'),
  host: config.get('databases.auth_postgres.host'),
  max: 5,
  database: config.get('databases.auth_postgres.database'),
  password: config.get('databases.auth_postgres.password'),
  port: config.get('databases.auth_postgres.port')
});

export const query = async query => {
  return new Promise((resolve, reject) => {
    pool.connect((err, client, release) => {
      if (err) {
        return reject(new Error('Error acquiring client' + err.stack));
      }
      client.query(query, (err, result) => {
        release();
        if (err) {
          return reject(new Error('Error executing query' + err.stack));
        }
        resolve(result.rows);
      });
    });
  });
};

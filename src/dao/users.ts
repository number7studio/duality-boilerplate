import bcrypt from 'bcrypt';
import { query } from '../database/pg';

export const createUser = async (username, password) => {
  const sql = `
        with new_user as (
            insert into users(username) values($1)
            returning id
        )
        insert into user_auth (user_id, password) 
            values((select id from new_user), $2);
    `;

  let hashedPassword;
  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }

  return query({
    text: sql,
    values: [username, hashedPassword]
  });
};

export const getUsers = async () => {
  return query('select * from users');
};

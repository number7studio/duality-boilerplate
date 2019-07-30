import bcrypt from 'bcrypt';

import { query } from '../database/pg';
import { createUser } from '../dao/users';
import { createSession } from './sessions';

export const signup = createUser;

export const login = async (username: string, password:string) => {
    const sql = `
        select u.id, ua.password as hpassword from users u
            left join user_auth ua on u.id = ua.user_id
        where u.username = $1
    `;
    
    const result = await query({
        text: sql,
        values: [username]
    });

    const {id, hpassword} = result[0];
    const match = await bcrypt.compare(password, hpassword);

    if (match) {
      return await createSession(id);
    }
}
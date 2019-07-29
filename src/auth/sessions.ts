import { sign, verify } from 'jsonwebtoken';
import { get } from 'config';

import { set as setCache, get as getFromCache } from '../database/redis';

interface AuthToken {
    userId: 'string'
}

export const verifySession = async (jwt): Promise<AuthToken> => {
    const decoded = verify(jwt, get('application.secret'));
    await getFromCache('authtoken.'+jwt);
    return jwt;
}

export const createSession = async (userId): Promise<string> => {
    const jwt = sign({userId}, get('application.secret'));
    await setCache('authtoken.'+jwt, "true");
    return jwt;
}

import { sign, verify } from 'jsonwebtoken';
import { get } from 'config';

import { set as setCache, get as getFromCache } from '../database/redis';

interface AuthToken {
  userId: string;
  createdAt: Date;
}

const verifySession = async (jwt): Promise<boolean> => {
  await getFromCache('authtoken.' + jwt);
  return jwt;
};

export const getSession = async (jwt): Promise<AuthToken> => {
  const decoded = verify(jwt, get('application.secret'));
  if (await verifySession(jwt)) {
    return decoded;
  } else {
    throw new Error('Invalid Token');
  }
};

export const createSession = async (userId): Promise<string> => {
  const now = new Date();
  const jwt = sign(
    { userId, createdAt: now.toISOString() },
    get('application.secret')
  );
  await setCache('authtoken.' + jwt, 'true');
  return jwt;
};

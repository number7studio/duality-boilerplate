import request from 'supertest';
import { appPromise } from '../app';
import { sequelize } from '../database/sequelize';

export const getUserToken = async () => {
  const app = await appPromise;

  await request(app.callback())
    .post('/auth/signup')
    .send({ username: 'foo', password: 'value2' })
    .set('Accept', 'application/json');

  const res = await request(app.callback())
    .post('/auth/login/email')
    .send({ username: 'foo', password: 'value2' })
    .set('Accept', 'application/json');

  return res.body.token;
};

export const resetDatabase = async () => {
  return sequelize.authenticate().then(() => {
      for(let model in sequelize.models) {
          sequelize.models[model].truncate();
      }
  })
};

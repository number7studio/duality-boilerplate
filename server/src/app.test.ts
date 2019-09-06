import request from 'supertest';
import serverStart from './app';
import { getUserToken, resetDatabase } from './tests/index';

test('Hello world works', async () => {
  await resetDatabase();

  const app = await serverStart;
  const response = await request(app.callback()).get('/health');
  expect(response.status).toBe(200);
  expect(response.text).toBe('Success');
});

test('Signup and login', async () => {
  await resetDatabase();
  const app = await serverStart;

  const userResponse = await request(app.callback())
    .post('/auth/signup')
    .send({ username: 'foo', password: 'value2' })
    .set('Accept', 'application/json');

  expect(userResponse.status).toBe(200);

  const loginResponse = await request(app.callback())
    .post('/auth/login/email')
    .send({ username: 'foo', password: 'value2' })
    .set('Accept', 'application/json');

  expect(loginResponse.status).toBe(200);
  expect(loginResponse.body.token).toBeTruthy();
  expect(loginResponse.body.token.length).toBeGreaterThan(10);
});

describe('Authorization', () => {
  let token;
  let app;
  beforeAll(async () => {
    await resetDatabase();
    token = await getUserToken();
    app = await serverStart;
  });

  test('Accessing admin endpoint as user', async () => {
    const usersResponse = await request(app.callback())
      .get('/users')
      .send({ username: 'foo', password: 'value2' })
      .set('Accept', 'application/json')
      .set('x-auth-token', token);

    expect(usersResponse.status).toBe(403);
  });
});

describe('Mood', () => {
  let token;
  let app;

  const createMoodEntry = async moodEntry => {
    return request(app.callback())
      .post('/moods')
      .send({
        moods: [
          { mood: 'happiness', rating: 5 },
          { mood: 'anxiety', rating: 1 }
        ]
      })
      .set('Accept', 'application/json')
      .set('x-auth-token', token);
  };

  beforeAll(async () => {
    await resetDatabase();
    token = await getUserToken();
    app = await serverStart;
  });

  test('Creating Mood entries', async () => {
    const response = await createMoodEntry([
      { mood: 'happiness', rating: 5 },
      { mood: 'anxiety', rating: 1 }
    ]);

    expect(response.status).toBe(200);
    for (let moodKey in response.body) {
      const mood = response.body[moodKey];
      expect(mood.createdAt).not.toBeNaN();
      expect(mood.moodEntryItems[0].mood).toEqual('anxiety');
    }
  });

  test('Get mood entries', async () => {
    for (let index = 0; index < 10; index++) {
      await createMoodEntry([
        { mood: 'happiness', rating: 5 },
        { mood: 'anxiety', rating: 1 }
      ]);
    }

    const response = await request(app.callback())
      .get('/moods')
      .set('Accept', 'application/json')
      .set('x-auth-token', token);

    expect(response.status).toBe(200);
    expect(Object.keys(response.body).length).toBe(5);

    for (let moodKey in response.body) {
      const mood = response.body[moodKey];
      expect(mood.createdAt).not.toBeNaN();
      expect(mood.moodEntryItems[0].mood).toEqual('anxiety');
    }
  });
});

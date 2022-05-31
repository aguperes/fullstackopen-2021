const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/user');

const api = supertest(app);

describe('invalid users are not created and invalid add user operation returns a suitable status code and error message', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  test('if username is invalid', async () => {
    const newUser = {
      username: 'us',
      name: 'usuario',
      password: 'password',
    };

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(response.body.error).toContain(
      'username and password must be at least 3 characters long'
    );
  });

  test('if password is invalid', async () => {
    const newUser = {
      username: 'usuario',
      name: 'usuario',
      password: 'pa',
    };

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(response.body.error).toContain(
      'username and password must be at least 3 characters long'
    );
  });

  test('if username is missing', async () => {
    const newUser = {
      name: 'usuario',
      password: 'password',
    };

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(response.body.error).toContain(
      'username and password must be given'
    );
  });

  test('if password is missing', async () => {
    const newUser = {
      username: 'us',
      name: 'usuario',
    };

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(response.body.error).toContain(
      'username and password must be given'
    );
  });
});

afterAll(async () => {
  mongoose.connection.close();
});

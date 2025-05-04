const request = require('supertest');
const app = require('../app'); // your Express app
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../models/userModel');

let mongoServer;

process.env.JWT_SECRET = 'testsecretforjest';

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await User.deleteMany();
});

describe('User Controller Tests', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({ name: 'Test', email: 'test@example.com', password: '123456' });
    
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body.name).toBe('Test');
  });

  it('should not register with existing email', async () => {
    await User.create({ name: 'Test', email: 'test@example.com', password: '123456' });
    const res = await request(app)
      .post('/api/users/register')
      .send({ name: 'Test', email: 'test@example.com', password: '123456' });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('User already exists');
  });

  it('should login with correct credentials', async () => {
    const user = await User.create({ name: 'Test', email: 'test@example.com', password: '123456' });
    const res = await request(app)
      .post('/api/users/login')
      .send({ email: 'test@example.com', password: '123456' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should fail login with wrong password', async () => {
    await User.create({ name: 'Test', email: 'test@example.com', password: '123456' });
    const res = await request(app)
      .post('/api/users/login')
      .send({ email: 'test@example.com', password: 'wrongpass' });

    expect(res.statusCode).toBe(401);
  });

  it('should get user profile with token', async () => {
    const res1 = await request(app)
      .post('/api/users/register')
      .send({ name: 'Test', email: 'test@example.com', password: '123456' });

    const token = res1.body.token;

    const res2 = await request(app)
      .get('/api/users/profile')
      .set('Authorization', `Bearer ${token}`);

    expect(res2.statusCode).toBe(200);
    expect(res2.body.email).toBe('test@example.com');
  });
});

const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const User = require('../models/User');
const Project = require('../models/Project');

describe('Project APIs', () => {
  let token;
  let userId;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        role: 'client',
      });

    token = res.body.token;
    userId = res.body.user.id;
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Project.deleteMany({});
    await mongoose.connection.close();
  });

  it('should create a new project', async () => {
    const res = await request(app)
      .post('/api/projects')
      .set('x-auth-token', token)
      .send({
        title: 'Test Project',
        description: 'This is a test project',
        skillsRequired: ['JavaScript', 'React'],
        budget: 1000,
        deadline: '2024-12-31',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('title', 'Test Project');
  });

  it('should get all projects', async () => {
    const res = await request(app).get('/api/projects');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

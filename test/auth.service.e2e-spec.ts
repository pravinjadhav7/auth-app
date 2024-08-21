import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { disconnect } from 'mongoose';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await disconnect(); // Disconnect Mongoose after tests are complete
    await app.close(); // Close the app after tests
  });

  it('/auth/signup (POST) - should sign up a user', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        email: 'test1@gmail.com',
        password: 'Test@1234',
        name: 'E2E Test User',
      })
      .expect(201);

    expect(response.body).toHaveProperty('access_token');
  });

  it('/auth/signin (POST) - should sign in a user', async () => {
    await request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        email: 'test@gmail.com',
        password: 'Test@1234',
        name: 'E2E Test User',
      });

    const response = await request(app.getHttpServer())
      .post('/auth/signin')
      .send({
        email: 'test@gmail.com',
        password: 'Test@1234',
      })
      .expect(201);

    expect(response.body).toHaveProperty('access_token');
  });

  it('/auth/signin (POST) - should return 401 if credentials are invalid', async () => {
    await request(app.getHttpServer())
      .post('/auth/signin')
      .send({
        email: 'invalid@gmail.com',
        password: 'invalidpassword',
      })
      .expect(401);
  });
});

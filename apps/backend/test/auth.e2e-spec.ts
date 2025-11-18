/**
 * GhostTip Backend - Auth Integration Tests
 */

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Auth (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      })
    );

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/api/auth/register (POST)', () => {
    it('should register a new user', () => {
      return request(app.getHttpServer())
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          password: 'SecurePassword123!',
          displayAlias: 'testuser',
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('accessToken');
          expect(res.body).toHaveProperty('user');
          expect(res.body.user.email).toBe('test@example.com');
        });
    });

    it('should reject weak passwords', () => {
      return request(app.getHttpServer())
        .post('/api/auth/register')
        .send({
          email: 'weak@example.com',
          password: 'weak',
          displayAlias: 'weakuser',
        })
        .expect(400);
    });

    it('should reject duplicate emails', async () => {
      // First registration
      await request(app.getHttpServer())
        .post('/api/auth/register')
        .send({
          email: 'duplicate@example.com',
          password: 'SecurePassword123!',
          displayAlias: 'duplicate1',
        });

      // Duplicate attempt
      return request(app.getHttpServer())
        .post('/api/auth/register')
        .send({
          email: 'duplicate@example.com',
          password: 'SecurePassword123!',
          displayAlias: 'duplicate2',
        })
        .expect(409);
    });
  });

  describe('/api/auth/login (POST)', () => {
    it('should login with valid credentials', async () => {
      // Register first
      await request(app.getHttpServer())
        .post('/api/auth/register')
        .send({
          email: 'login@example.com',
          password: 'SecurePassword123!',
          displayAlias: 'loginuser',
        });

      // Then login
      return request(app.getHttpServer())
        .post('/api/auth/login')
        .send({
          email: 'login@example.com',
          password: 'SecurePassword123!',
        })
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('accessToken');
        });
    });

    it('should reject invalid credentials', () => {
      return request(app.getHttpServer())
        .post('/api/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'WrongPassword123!',
        })
        .expect(401);
    });
  });
});

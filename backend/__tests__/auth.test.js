import request from 'supertest';
import app from '../server'; 
import { User } from '../models/user.model.js';
import bcrypt from 'bcryptjs';

describe('Auth API', () => {

  let user;

  beforeAll(async () => {
    // Tạo người dùng giả trước khi chạy các bài kiểm tra
    const password = await bcrypt.hash('password123', 10);
    user = new User({ email: 'test@example.com', password });
    await user.save();
  });

  afterAll(async () => {
    // Xóa người dùng sau khi kiểm tra xong
    await User.deleteOne({ email: 'test@example.com' });
  });

  describe('POST /api/auth/login', () => {
    it('should login with valid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123',
        });
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Login successfully!');
      expect(response.body.token).toBeDefined();
    });

    it('should return an error if email is not provided', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          password: 'password123',
        });
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Email and password are required!');
    });

    it('should return an error if password is incorrect', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword',
        });
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Password was wrong!');
    });

    it('should return an error if user does not exist', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'password123',
        });
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('User is not found!');
    });
  });

  describe('POST /api/auth/signup', () => {
    it('should sign up a new user', async () => {
      const response = await request(app)
        .post('/api/auth/signup')
        .send({
          email: 'newuser@example.com',
          password: 'password123',
        });
      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Sign Up Successfully!');
    });

    it('should return an error if email is already used', async () => {
      const response = await request(app)
        .post('/api/auth/signup')
        .send({
          email: 'test@example.com', // Đã tồn tại
          password: 'password123',
        });
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Email is already used!');
    });

    it('should return an error if email or password is not provided', async () => {
      const response = await request(app)
        .post('/api/auth/signup')
        .send({
          email: '',
          password: 'password123',
        });
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Email and password are required!');
    });
  });
});

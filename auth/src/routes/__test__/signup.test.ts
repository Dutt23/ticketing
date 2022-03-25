import request from 'supertest';
import { app } from '../../app';

it('returns a 201 with successfull response', async () =>{
  return request(app)
         .post('/api/users/signup')
         .send({
           email:'test@test.com',
           password: 'password'
         })
        .expect(201)
})

it('should return 400 for missing password', async () =>{
  return request(app)
         .post('/api/users/signup')
         .send({
           email:'test@test.com',
           password: ''
         })
        .expect(400)
})

it('should return 400 for missing email', async () =>{
  return request(app)
         .post('/api/users/signup')
         .send({
           email:'',
           password: '1234567'
         })
        .expect(400)
})

it('should return 400 for invalid password', async () =>{
  return request(app)
         .post('/api/users/signup')
         .send({
           email:'test@test.com',
           password: '123'
         })
        .expect(400)
})

it('should return 400 for invalid email', async () =>{
  return request(app)
         .post('/api/users/signup')
         .send({
           email:'testtest.com',
           password: '1234567'
         })
        .expect(400)
})
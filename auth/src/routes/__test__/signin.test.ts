import request from 'supertest';
import { app } from '../../app';


it('should not allow unknown email to sign in', async () =>{
  return request(app)
         .post('/api/users/signin')
         .send({
           email:'test@test.com',
           password: 'password'
         })
        .expect(400)
})


it('should not allow wrong password signin', async () =>{
  await request(app)
         .post('/api/users/signup')
         .send({
           email:'test@test.com',
           password: 'password'
         })
        .expect(201)

  await request(app)
        .post('/api/users/signin')
        .send({
          email:'test@test.com',
          password: '1234566'
        })
       .expect(400)
})

it('Cookie should be set after signin', async () =>{
  await request(app)
         .post('/api/users/signup')
         .send({
           email:'test@test.com',
           password: 'password'
         })
        .expect(201)

  const response = await request(app)
        .post('/api/users/signin')
        .send({
          email:'test@test.com',
          password: 'password'
        })
       .expect(200)
  expect(response.get('Set-Cookie')).toBeDefined()
})
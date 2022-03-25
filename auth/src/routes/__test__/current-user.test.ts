import request from 'supertest';
import { app } from '../../app';

it('Should respond with details of the current user', async () =>{
const cookie  = await global.signin()
const response = await request(app)
                      .get('/api/users/currentUser')
                      .set('Cookie', cookie)
                      .send({
                        email:'test@test.com',
                        password: 'password'
                      })
                      .expect(200)

expect(response.body.currentUser.email).toEqual('test@test.com')
})

it('Should respond with details of the current user as null', async () =>{
  const response = await request(app)
                        .get('/api/users/currentUser')
                        .send({
                          email:'test@test.com',
                          password: 'password'
                        })
                        .expect(200)
  
  expect(response.body.currentUser).toEqual(null)
  })

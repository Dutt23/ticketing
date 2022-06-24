import request from 'supertest';
import { app } from '../../app';

it('has a route handler listening to /api/tickets for post request', async () =>{
  const response = await request(app)
                           .post('/api/tickets')
                           .send({});
  expect(response.statusCode).not.toEqual(404)
});

it('can only be accessed if user signed in', async () =>{
  
});

it('return error if invalid title provided', async () =>{
  
});

it('return error if invalid price is provided', async () =>{
  
});

it('creates a ticket with valid parameters', async () =>{
  
});

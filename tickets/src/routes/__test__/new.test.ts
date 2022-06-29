import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';

it('has a route handler listening to /api/tickets for post request', async () =>{
  const response = await request(app)
                           .post('/api/tickets')
                           .send({});
  expect(response.statusCode).not.toEqual(404)
});

it('can only be accessed if user signed in', async () =>{
  const response = await request(app)
    .post('/api/tickets')
    .send({})
    .expect(401)
});

it('return status other than 401 if signed in', async () =>{
  const cookie = global.signin();
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({});
  expect(response.statusCode).not.toEqual(401);
});

it('return error if invalid title provided', async () =>{
  const cookie = global.signin();
  await request(app)
  .post('/api/tickets')
  .set('Cookie', cookie)
  .send({
    title:'',
    price: 10
  })
  .expect(400);

  await request(app)
  .post('/api/tickets')
  .set('Cookie', cookie)
  .send({
    price: 10
  })
  .expect(400);
});

it('return error if invalid price is provided', async () =>{
  const cookie = global.signin();
  await request(app)
  .post('/api/tickets')
  .set('Cookie', cookie)
  .send({
    title:'test',
    price: -10
  })
  .expect(400);

  await request(app)
  .post('/api/tickets')
  .set('Cookie', cookie)
  .send({
    title:'test',
  })
  .expect(400);
});

it('creates a ticket with valid parameters', async () =>{
  const cookie = global.signin();
  let tickets = await Ticket.find({});
  expect(tickets.length).toEqual(0);
  const title = 'title'
  await request(app)
  .post('/api/tickets')
  .set('Cookie', cookie)
  .send({
    title,
    price: 1000
  })
  .expect(201);

  tickets = await Ticket.find({});
  expect(tickets.length).toEqual(1);
  expect(tickets[0].price).toEqual(1000);
  expect(tickets[0].title).toEqual(title);
});

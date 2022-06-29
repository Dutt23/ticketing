import request from 'supertest';
import { app } from '../../app';

it('returns 404 if ticket is not found', async () => {
  const cookie = global.signin();
  await request(app).get('/api/tickets/fail_ticket_one').set('Cookie', cookie).expect(404);
});

it('returns ticket if found', async () =>{
  const cookie = global.signin();
  const title = 'title_1';
  const price = 10000.93;

  const response = await request(app)
  .post('/api/tickets')
  .set('Cookie', cookie)
  .send({
    title,
    price,
  })
  .expect(201);

  const ticketResponse = await request(app)
  .get(`/api/tickets/${response.body.id}`)
  .set('Cookie', cookie)
  .send({
    title,
    price,
  })
  .expect(200);

  expect(ticketResponse.body.title).toEqual(title);
  expect(ticketResponse.body.price).toEqual(price);
});


import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';


const createTicket = async (title: string, price: number) =>{
  const cookie = global.signin();
  return request(app)
  .post('/api/tickets')
  .set('Cookie', cookie)
  .send({
    title,
    price,
  })
  .expect(201);
}

it('return 404 if ticket id is invalid', async () =>{
  const cookie = global.signin();
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app).put(`/api/tickets/${id}`)
  .set('Cookie', cookie)
  .send({
    title:'Updated Title',
    price: 20
  })
  .expect(404);
});

it('return 401 if user is not authenticated', async () =>{
  await request(app).put(`/api/tickets/dummy_ticket`)
  .send({
    title:'Updated Title',
    price: 20
  })
  .expect(401)
});

it('return 401 if user is not owner of ticket', async () =>{
  const { body }  = await createTicket("Test_Ticker", 1000);
  const cookie = global.signin();
  
  await request(app).put(`/api/tickets/${body.id}`)
  .set('Cookie', cookie)
  .send({
    title:'Updated Title',
    price: 20
  })
  .expect(401);
});

it('return 400 if invalid price or title', async () =>{

});

it('updates the ticket provided valid inputs', async () =>{

});
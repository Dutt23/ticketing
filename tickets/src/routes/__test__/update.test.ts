import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';


const createTicket = async (title: string, price: number) =>{
  const cookie = global.signin();
  const res = await request(app)
  .post('/api/tickets')
  .set('Cookie', cookie)
  .send({
    title,
    price,
  })
  .expect(201);

  return { res, cookie } ;
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
  const { res: { body }}  = await createTicket("Test_Ticker", 1000);
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
  const { cookie, res: { body }}  = await createTicket("Test_Ticker", 1000);

  const jsons = [
    {
      price: 20
    },
    {
      title: '',
      price: 20
    },
    {
      title: 'valid_title',
      price: -10.
    },
    {
      title: 'another_valid_title',
    }
  ]

  for(const json of jsons){
    await request(app).put(`/api/tickets/${body.id}`)
    .set('Cookie', cookie)
    .send(json)
    .expect(400)
  }
});

it('updates the ticket provided valid inputs', async () =>{
const { cookie, res: { body }}  = await createTicket("Test_Ticker", 1000);
const response = await request(app).put(`/api/tickets/${body.id}`)
.set('Cookie', cookie)
.send({
  title: 'Title Updated',
  price: 180.90
})
.expect(200);

expect(response.body.title).toEqual('Title Updated');
expect(response.body.price).toEqual(180.90);
expect(response.body.id).toEqual(body.id);
});
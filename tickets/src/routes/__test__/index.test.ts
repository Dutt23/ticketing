import request from 'supertest';
import { app } from '../../app';

const createTicket = async (title: string, price: number) =>{
  const cookie = global.signin();
  return request(app)
  .post('/api/tickets')
  .set('Cookie', cookie)
  .send({
    title,
    price,
  })
  .expect(201)
}

it("it should list all the created tickets", async() =>{
  const cookie = global.signin();
  const promises = [];
  for(let i = 0; i <10; i++){
    promises.push(createTicket(`ticket_number_${1}`, 1000));
  }
  await Promise.all(promises);

  const { body } = await request(app).get('/api/tickets').set('Cookie', cookie).expect(200);
  expect(body.length).toBe(10);
})
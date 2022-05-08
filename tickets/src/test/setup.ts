import { app } from '../app';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from "mongoose";
import request from 'supertest';
// Won't be available in normal environments
// As it's being set up here
declare global {
  var signin: () => Promise<string[]>;
}

let mongo: any;
beforeAll(async () =>{
  process.env.JWT_KEY = '123456'
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri)
})

beforeEach(async () =>{
  const collections = await mongoose.connection.db.collections();
  const deletePromises = [];
  for(let collection of collections){
    deletePromises.push(collection.deleteMany({}));
  }

  await Promise.all(deletePromises)
})

afterAll(async () =>{
  await mongo.stop();
  await mongoose.connection.close();
}) 

global.signin = async () =>{
  const response = await request(app)
  .post('/api/users/signup')
  .send({
    email:'test@test.com',
    password: 'password'
  })
 .expect(201)

 const cookie = response.get('Set-Cookie');
 return cookie;
}

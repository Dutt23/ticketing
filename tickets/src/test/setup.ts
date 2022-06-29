import { app } from '../app';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import monggose from 'mongoose';
// Won't be available in normal environments
// As it's being set up here
declare global {
  var signin: () => string[];
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

global.signin = () =>{
  // Build jwt payload { id, email }
  const payload = {
    id: new monggose.Types.ObjectId().toHexString(),
    email: 'shatyaki_1@test.com'
  }
  const token = jwt.sign(payload, process.env.JWT_KEY!);
  const session = { jwt : token };
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');
 return [`session=${base64}`];
}

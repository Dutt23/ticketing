import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from "mongoose";

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

import mongoose from 'mongoose';
import { app } from './app';

const connectDb = async () => {
  if(!process.env.MONGO_URI){
    throw new Error("Mongo uri not defined")
  }
  
  try {
    const res = await mongoose.connect(process.env.MONGO_URI);
    console.log(res.modelNames())
    console.log("Connected to mongo db")
  }
  catch(err){
    console.error(err);
  }
}


app.listen(3000, async () =>{
  await connectDb();
  console.log('Tickets service started on port 3000')
})
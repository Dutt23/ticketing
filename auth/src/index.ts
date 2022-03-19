import mongoose from 'mongoose';
import { app } from './app';

const connectDb = async () => {
  try {
    const res = await mongoose.connect(`mongodb://auth-mongo-srv:27017/auth`);
    console.log(res.modelNames())
    console.log("Connected to mongo db")
  }
  catch(err){
    console.error(err);
  }
}


app.listen(3000, async () =>{
  await connectDb();
  console.log('Auth service started on port 3000')
})
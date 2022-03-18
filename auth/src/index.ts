import express from 'express'
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import 'express-async-errors'
import { json } from 'body-parser'
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { RouteNotfound } from './errors/route-not-found-error';

const app = express();
app.set('trust proxy', true)
app.use(json())
app.use(cookieSession({
  signed: false,
  secure: true
}))

app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)

app.all('*', async () =>{
  throw new RouteNotfound('Route not found')
})
app.use(errorHandler)

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

connectDb();
app.listen(3000, () =>{
  console.log('Auth service started on port 3000')
})
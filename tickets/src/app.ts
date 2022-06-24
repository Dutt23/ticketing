// For setting up test related stuff, check package.json
// in the jest portion.
import express from 'express'
import cookieSession from 'cookie-session';
import 'express-async-errors'
import { json } from 'body-parser'
import { errorHandler, RouteNotfound } from '@shatyaki-dutt-tickets/common';
import { createTicketRouter } from './routes/new';

const app = express();
app.set('trust proxy', true)
app.use(json())
app.use(cookieSession({
  signed: false,
  // cookie with jwt is only set, when api call is made through secure connection
  // We toggle it off during tests
  secure: process.env.NODE_ENV !== 'test'
}))

app.use(createTicketRouter)
app.all('*', async () =>{
  throw new RouteNotfound('Route not found')
})
app.use(errorHandler)

export { app };
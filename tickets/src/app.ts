// For setting up test related stuff, check package.json
// in the jest portion.
import express from 'express'
import cookieSession from 'cookie-session';
import 'express-async-errors'
import { json } from 'body-parser'
import { errorHandler, RouteNotfound, currentUser } from '@shatyaki-dutt-tickets/common';
import { createTicketRouter } from './routes/new';
import { showTicketRouter } from './routes/show';

const app = express();
app.set('trust proxy', true)
app.use(json())
app.use(cookieSession({
  signed: false,
  // cookie with jwt is only set, when api call is made through secure connection
  // We toggle it off during tests
  secure: process.env.NODE_ENV !== 'test'
}))
// needs to be after cookie session.
// otherwise user won't be set
app.use(currentUser);

app.use(createTicketRouter);
app.use(showTicketRouter);
app.all('*', async () =>{
  throw new RouteNotfound('Route not found')
})
app.use(errorHandler)

export { app };
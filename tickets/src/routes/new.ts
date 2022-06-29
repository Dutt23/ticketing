import express, { Request, Response } from 'express';
import { requireAuth } from '@shatyaki-dutt-tickets/common';
const router = express.Router();

router.post('/api/tickets', requireAuth, async ( req: Request, res: Response) =>{
  res.send(200)
})

export { router as createTicketRouter }
import express, { Request, Response } from 'express';
import { requireAuth, validateRequest } from '@shatyaki-dutt-tickets/common';
import { body } from 'express-validator'
import { Ticket } from '../models/ticket';

const router = express.Router();

router.get('/api/tickets', async (req: Request, res: Response) =>{
  const tickets = await Ticket.find({});
  res.status(200).send(tickets);
});

export { router as indexTicketsRouter} 


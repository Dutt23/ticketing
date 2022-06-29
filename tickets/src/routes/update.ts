import express, { Request, Response } from 'express';
import { requireAuth, validateRequest, NotAuthorizedError, Notfound } from '@shatyaki-dutt-tickets/common';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.put('/api/tickets/:id', requireAuth, async (req: Request, res: Response) =>{
  const ticket = await Ticket.findById(req.params.id);
  if(!ticket){
    throw new Notfound("Ticket not found");
  }

  if(ticket.userId !== req.currentUser!.id){
    throw new NotAuthorizedError();
  }

  res.send(ticket);
})

export { router as updateTicketRouter };
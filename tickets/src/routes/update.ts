import express, { Request, Response } from 'express';
import { requireAuth, validateRequest, NotAuthorizedError, Notfound } from '@shatyaki-dutt-tickets/common';
import { Ticket } from '../models/ticket';
import { body } from 'express-validator'

const router = express.Router();

router.put('/api/tickets/:id', requireAuth, [
  body('title').not().isEmpty().withMessage('Title is required'),
  body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than zero')
], validateRequest, async (req: Request, res: Response) =>{
  const ticket = await Ticket.findById(req.params.id);
  if(!ticket){
    throw new Notfound("Ticket not found");
  }

  if(ticket.userId !== req.currentUser!.id){
    throw new NotAuthorizedError();
  }

  const { body } = req;

  ticket.set({
    title: body.title,
    price: body.price
  })
  
  await ticket.save();
  res.send(ticket);
})

export { router as updateTicketRouter };
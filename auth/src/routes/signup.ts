import express, { Request, Response } from 'express'
import { body } from 'express-validator';
import { BadRequestError, validateRequest } from '@shatyaki-dutt-tickets/common';
import { User } from '../models/user'
import  jwt  from 'jsonwebtoken';

const router = express.Router();

router.post('/api/users/signup',[
  body('email')
  .isEmail()
  .withMessage('Email must be valid'),
  body('password')
  .trim()
  .isLength({ min :4, max:20})
  .withMessage('Password must be between 4 and 20 characters')
],
validateRequest,
async (req: Request, res: Response) =>{

  const { body : { email, password } } = req;
  const existingUser = await User.findOne({ email })
  if(existingUser){
    throw new BadRequestError('User already exists')
  }

  const newUser = User.build({
    email,
    password
  })

  await newUser.save()
  // Generate JWT
  const userJwt = jwt.sign({
    id: newUser.id,
    email: newUser.email
  }, process.env.JWT_KEY!)

  req.session = {
    jwt: userJwt
  }

  res.status(201).send(newUser)
})

export { router as signupRouter}
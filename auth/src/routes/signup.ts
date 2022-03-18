import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-errors';
import { BadRequestError } from '../errors/bad-request-error';

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
async (req: Request, res: Response) =>{

  const { body : { email, password } } = req;
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    throw new RequestValidationError(errors.array()) 
  }

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
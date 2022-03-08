import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-errors';
import { DatabaseConnectionError } from '../errors/database-connection-errror';

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
(req: Request, res: Response) =>{

  const errors = validationResult(req)
  if(!errors.isEmpty()){
    throw new RequestValidationError(errors.array()) 
  }

  const { body: { email, password } } = req;
  console.log("Creating a user");
  console.log(`Email is : ${email} and password is ${password}`)
  throw new DatabaseConnectionError();
})

export { router as signupRouter}
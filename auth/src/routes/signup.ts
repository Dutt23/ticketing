import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator';

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
     throw new Error("Invalid email or password")
  }

  const { body: { email, password } } = req;
  console.log("Creating a user");
  console.log(`Email is : ${email} and password is ${password}`)
  res.send({
    email,
    password,
    status: 'Created'
  })
})

export { router as signupRouter}
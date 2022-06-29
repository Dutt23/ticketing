import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) =>{

let statusCode = 400;
let errorResponse  = [{
  message: 'Something went wrong'
}];

if(err instanceof CustomError){
  statusCode = err.statusCode;
  errorResponse = err.serializeErrors();
}

console.error(err);
res.status(statusCode).send({
  errors: errorResponse
})
}
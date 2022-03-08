import { ValidationError } from "express-validator";
// See inside class why this is not used`
// import { CustomError } from "./custom-error-back";
import { CustomError } from './custom-error';
export class RequestValidationError extends CustomError{
  statusCode = 400;
  
  constructor(public errors: ValidationError[]){
    super('Invalid request');

    // Only because we extending the class
    Object.setPrototypeOf(this, RequestValidationError.prototype)
  }

  serializeErrors() {
   return this.errors.map(error=>({
      message: error.msg,
      field: error.param
    }))
  }
}
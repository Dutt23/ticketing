import { CustomError } from './custom-error';

export class NotAuthorizedError extends CustomError {
  statusCode = 401;

  constructor(){
    super('Not authorised')

    // Only because we extending the class
    Object.setPrototypeOf(this, NotAuthorizedError.prototype)
  }
  serializeErrors(): { message: string; field?: string | undefined; }[] {
    return [{ message: 'Not authorised'}]
  }
  
}
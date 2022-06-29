import { CustomError } from "./custom-error"

export class Notfound extends CustomError{
  statusCode = 404;

  constructor(message: string){
    super(message);


    Object.setPrototypeOf(this, Notfound.prototype)
  }

  serializeErrors(){
    return [{
      message: "Resource not found"
    }]
  }
}
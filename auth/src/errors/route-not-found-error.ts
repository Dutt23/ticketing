import { CustomError } from "./custom-error"

export class RouteNotfound extends CustomError{
  statusCode = 404;

  constructor(message: string){
    super(message);


    Object.setPrototypeOf(this, RouteNotfound.prototype)
  }

  serializeErrors(){
    return [{
      message: "Route not found"
    }]
  }
}
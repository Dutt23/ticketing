// This class can't be instantiated , but we need a blueprint of a class
// Can be used for instance of
export abstract class CustomError extends Error{
abstract statusCode: number;

constructor(message: string){
  super(message);

  Object.setPrototypeOf(this, CustomError.prototype);
}
abstract serializeErrors(): { message: string, field? : string}[];
}
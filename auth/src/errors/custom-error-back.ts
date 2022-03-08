// Interface is not translated into a class in javascript hence not using this.
// https://stackoverflow.com/questions/48407143/why-dont-i-need-to-export-import-typescript-interfaces
export interface CustomError{
  statusCode: number;
  serializeErrors():{
    message: string;
    field?: string
  }[];
}
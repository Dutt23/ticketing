import mongoose from "mongoose";

export class BaseModel extends mongoose.Document{

  constructor(...args: any){
    super();
    throw new Error("Do not use base constructor")
  }
}
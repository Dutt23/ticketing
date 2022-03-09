import mongoose from 'mongoose';

// an interface that describes ht pros to create new user

interface UserAttrs {
  email: string;
  password: string;
}

interface UserModel extends mongoose.Model<UserDoc>{
  build(attrs: UserAttrs): UserDoc;
}

interface UserDoc extends mongoose.Document{
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  }
});

userSchema.statics.buffer = (attrs: UserAttrs) => new User(attrs)
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
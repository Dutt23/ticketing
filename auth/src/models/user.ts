import mongoose from 'mongoose';

// an interface that describes ht pros to create new user

interface UserAttrs {
  email: string;
  password: string;
}

interface UserModel extends mongoose.Model<any>{
  build(attrs: UserAttrs): any;
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
const User = mongoose.model<any, UserModel>('User', userSchema);



User.build({
  email: 'test@test.com',
  password: 'wiwwiwhjiw'
})

export { User };
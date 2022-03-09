import mongoose from 'mongoose';

// an interface that describes ht pros to create new user

interface UserAttrs {
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

const User = mongoose.model('User', userSchema);

const buildUser = (attrs: UserAttrs) =>{
  return new User(attrs);
}

new User({
  email: 'test@test.com',
  password: 'wiwwiwhjiw'
})
export { User, buildUser };
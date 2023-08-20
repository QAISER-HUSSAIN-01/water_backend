import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  phone: String,
  address: String,
  bottles: String
});

const User = mongoose.model('User', userSchema);
export default User;
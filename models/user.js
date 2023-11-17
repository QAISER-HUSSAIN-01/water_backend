import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  phone: String,
  address: String,
  bottles: String,
  balance:String,
  remainingAmount:String,
  recievedAmount:String
});

const User = mongoose.model('User', userSchema);
export default User;
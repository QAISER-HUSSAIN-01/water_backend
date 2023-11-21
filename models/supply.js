import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const sppplySchema = new Schema({
  userId:mongoose.Schema.Types.ObjectId,
  name: String,
  bottlesIn: String,
  bottlesOut: String,
  address: String,
  phone: String,
  bottles: String,
  balance:String,
  remainingAmount:String,
  recievedAmount:String
});

const Supply = mongoose.model('Supply', sppplySchema);
export default Supply;
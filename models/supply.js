import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const sppplySchema = new Schema({
  userId:mongoose.Schema.Types.ObjectId,
  customerId:mongoose.Schema.Types.ObjectId,
  bottlesIn: String,
  bottlesOut: String,
  remainingAmount:String,
  recievedAmount:String
});

const Supply = mongoose.model('Supply', sppplySchema);
export default Supply;
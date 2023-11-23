import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const inventorySchema = new Schema({
  totalBottles: String,
});

const Inventory = mongoose.model('Inventory', inventorySchema);
export default Inventory;
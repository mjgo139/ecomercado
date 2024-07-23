import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
  name: { type: String},
  phone: { type: String },
  description: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  logo: { type: String },
  status: { type: Boolean, default: false}
});

export default mongoose.model('Store', storeSchema);

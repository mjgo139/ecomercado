import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  photo: { type: String },
  availability: { type: Boolean, default: true },
  idStore: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true },
  idCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category'}
});

export default mongoose.model('Product', productSchema);

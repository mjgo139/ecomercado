import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    description: { type: String },
});

export default mongoose.model('Category', categorySchema);

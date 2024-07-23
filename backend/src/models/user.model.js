import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    role: { type: String, enum: ['Admin', 'User'], default: 'User' },
    password: { type: String, required: true }
}, {timestamps: true})

export default mongoose.model('User', userSchema)
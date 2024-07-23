import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

export const connectDB = async()=>{
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USUARIO}:${process.env.DB_PASSWORD}@${process.env.DB_DOMAIN}/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=${process.env.DB_CLUSTER}`)
        console.log('Base de Datos conectada');
    } catch (error) {
        console.log(error);
    }
}
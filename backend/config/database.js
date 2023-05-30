import mongoose from "mongoose";
import ErrorHandler from "../utils/ErrorHandler";

export const connectDB = async () => {
    try {
        const { connection } = await mongoose.connect(process.env.MONGO_URI);
       
        console.log(`Database is connected to ${connection.host} `)
        
    } catch (error) {
        return new ErrorHandler("Database connection failed",502)
    }
}
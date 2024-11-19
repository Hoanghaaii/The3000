import mongoose from "mongoose";

export const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.DATABASE_URL)
        console.log("MongoDb Connected!")
    } catch (error) {
        console.log("Error connection to MongoDb", error.message)
        process.exit(1)
    }
}

export const disconnectDB = async () => {
    try {
        await mongoose.disconnect();
        console.log("MongoDb Disconnected!");
    } catch (error) {
        console.log("Error disconnecting MongoDb", error.message);
    }
};
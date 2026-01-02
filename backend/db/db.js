import mongoose from "mongoose";

const connectDB = async () => {
   try {
     await mongoose.connect(process.env.MONGO_URI);
     console.log("Connected to DB");
   } catch (error) {
     console.log(error.message);
     throw new Error(error.message);
   }
}

export default connectDB;
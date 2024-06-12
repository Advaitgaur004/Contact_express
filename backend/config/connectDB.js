import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config({
  path : '../.env'
})

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://advaitgaur2003:TgNY0L5Wpehttfo7@advaitcluster01.iam8mwj.mongodb.net/contacts?retryWrites=true&w=majority&appName=Advaitcluster01');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB
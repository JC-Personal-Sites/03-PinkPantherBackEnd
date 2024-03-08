import mongoose, { connect } from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    mongoose.Promise = global.Promise;
    const conn = await connect(process.env.MONGODB_URI || "", {});
    console.log(`MongoDB Conected ${conn.connection.name}`.cyan.underline.bold);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;

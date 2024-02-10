import mongoose from 'mongoose';

export const connectDB = async () => {
  mongoose.Promise = global.Promise;

  const conn = await mongoose.connect(process.env.MONGODB_URI, {});

  console.log(`MongoDB Conected ${conn.connection.name}`.cyan.underline.bold);
};

export default connectDB;

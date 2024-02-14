import mongoose, { connect } from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    mongoose.Promise = global.Promise;

<<<<<<< HEAD
  const conn = await connect(process.env.MONGODB_URI || "", {});
=======
    const conn = await connect(process.env.MONGODB_URI, {});
>>>>>>> 98b7631dae0d9b02983bfdc7e9474d32e140d3fc

    console.log(`MongoDB Conected ${conn.connection.name}`.cyan.underline.bold);
  } catch (err) {
    return err;
  }
};

export default connectDB;

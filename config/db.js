const mongoose = require('mongoose');

const connectDB = async () => {
	const conn = await mongoose.connect(process.env.DEV_MONGO_URI, {
		useUnifiedTopology: true,
	});
	
	console.log(`MongoDB Conected ${conn.connection.name}`.cyan.underline.bold);
};

module.exports = connectDB;

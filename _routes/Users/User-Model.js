const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
	{
		firstName: { type: String },
    lastName: { type: String },
    phoneNumber: { type: String },
    emailAddress:{ type: String },
    job: { type: String },
    type: { type: String }
	},
	{
		versionKey: false,
	}
);

module.exports = mongoose.model('Pinkpantheruser', UserSchema);
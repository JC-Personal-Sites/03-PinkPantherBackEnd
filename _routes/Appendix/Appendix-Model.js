const mongoose = require('mongoose');

const AppendixSchema = new mongoose.Schema(
	{
		Reference: { type: String, required: [true, 'Required'] },
		Link: { type: String },
		Comments: { type: String },
		Type: { type: String, required: [true, 'Required'] },
		Topic: { type: String, required: [true, 'Required'] },
	},
	{ collection: 'PinkPantherAppendix' }
);

// You can add all sorts to control the data i.e. Regex - check the mongoose docs https://mongoosejs.com/
module.exports = mongoose.model('AppendixModel', AppendixSchema);

const mongoose = require('mongoose');

const NavBarSchema = new mongoose.Schema(
	{
		id: { type: Number },
		title: { type: String, required: [true, 'Required'] },
		link: { type: String, required: [true, 'Required'] }
	},
	{
		versionKey: false,
	}
);

module.exports = mongoose.model('Pinkpanthernavbar', NavBarSchema);
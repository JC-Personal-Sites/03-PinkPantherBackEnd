const mongoose = require('mongoose');

const PicturesSchema = new mongoose.Schema(
	{
		title: { type: String, required: [true, 'Required'] },
		url: { type: String, required: [true, 'Required'] },
		source: { type: String, required: [true, 'Required'] },
		comments: { type: String },
		likes: { type: String },
	},
	{ collection: 'PinkPantherPictures' }
);

// You can add all sorts to control the data i.e. Regex - check the mongoose docs https://mongoosejs.com/
module.exports = mongoose.model('PictureModel', PicturesSchema);

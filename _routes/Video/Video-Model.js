const mongoose = require('mongoose');

const VideosSchema = new mongoose.Schema(
	{
		title: { type: String, required: [true, 'Required'] },
		url: { type: String, required: [true, 'Required'] },
		episode: { type: String },
		season: { type: String },
		likes: { type: String },
		source: { type: String, required: [true, 'Required'] },
	},
	{ collection: 'PinkPantherVideos' }
);

// You can add all sorts to control the data i.e. Regex - check the mongoose docs https://mongoosejs.com/
module.exports = mongoose.model('VideoModel', VideosSchema);

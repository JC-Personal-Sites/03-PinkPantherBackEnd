const VideoSchema = require('./Video-Model');
const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../middleware/async');

exports.getVideos = asyncHandler(async (req, res, next) => {
	try {
		const videos = await VideoSchema.find();

		res.status(200).json({ data: videos });
	} catch (err) {
		return next(new ErrorResponse(`Data not found`, 500));
	}
});

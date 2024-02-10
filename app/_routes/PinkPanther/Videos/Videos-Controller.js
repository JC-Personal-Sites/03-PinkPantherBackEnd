const VideoSchema = require('./Videos-Model');
const ErrorResponse = require('../../../middleware/errorResponse');
const asyncHandler = require('../../../middleware/async');

exports.getVideos = asyncHandler(async (req, res, next) => {
  try {
    const videos = await VideoSchema.find();

    res.status(200).json({ data: videos });
  } catch (err) {
    return next(new ErrorResponse(`Data not found`, 500));
  }
});

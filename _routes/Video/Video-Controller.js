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

exports.getVideo = asyncHandler(async (req, res, next) => {
	const Video = await VideoModel.findById(req.params.id);

	if (!Video) {
		return next(new ErrorResponse(`Data not found with id of ${req.params.id}`, 404));
	}

	res.status(200).json({ success: true, data: Video });
});

exports.createVideo = asyncHandler(async (req, res, next) => {
	const createVideo = await VideoModel.create(req.body);

	res.status(201).json({ success: true, data: createVideo });
});

exports.updateVideo = asyncHandler(async (req, res, next) => {
	let updateVideo = await VideoModel.findById(req.params.id);

	if (!updateVideo) {
		return next(new ErrorResponse(`Data not found with id of ${req.params.id}`, 404));
	}

	updateVideo = await VideoModel.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});
	res.status(200).json({ success: true, data: updateVideo });
});

exports.deleteVideo = asyncHandler(async (req, res, next) => {
	let deleteVideo = await VideoModel.findById(req.params.id);

	if (!deleteVideo) {
		return next(new ErrorResponse(`Data not found with id of ${req.params.id}`, 404));
	}

	deleteVideo.remove();
	res.status(200).json({ success: true, data: {} });
});

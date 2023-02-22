const PictureModel = require('./Picture-Model');
const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../middleware/async');

/**
@route     (GET) - picture
 */
exports.getPictures = asyncHandler(async (req, res, next) => {
	const Pictures = await PictureModel.find();

	res.status(200).json({ success: true, data: Pictures });
});

/**
@route     (GET) - picture/:id
 */
exports.getPicture = asyncHandler(async (req, res, next) => {
	const Picture = await PictureModel.findById(req.params.id);

	if (!Picture) {
		return next(new ErrorResponse(`Data not found with id of ${req.params.id}`, 404));
	}

	res.status(200).json({ success: true, data: Picture });
});

/**
@route     (POST) - picture
 */
exports.createPicture = asyncHandler(async (req, res, next) => {
	const createPicture = await PictureModel.create(req.body);

	res.status(201).json({ success: true, data: createPicture });
});

/**
@route     (PUT) - picture/:id
 */
exports.updatePicture = asyncHandler(async (req, res, next) => {
	let updatePicture = await PictureModel.findById(req.params.id);

	if (!updatePicture) {
		return next(new ErrorResponse(`Data not found with id of ${req.params.id}`, 404));
	}

	updatePicture = await PictureModel.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});
	res.status(200).json({ success: true, data: updatePicture });
});

/**
@route     (DELETE) - picture/:id
 */
exports.deletePicture = asyncHandler(async (req, res, next) => {
	let deletePicture = await PictureModel.findById(req.params.id);

	if (!deletePicture) {
		return next(new ErrorResponse(`Data not found with id of ${req.params.id}`, 404));
	}

	deletePicture.remove();
	res.status(200).json({ success: true, data: {} });
});

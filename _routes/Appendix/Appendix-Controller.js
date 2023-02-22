const AppendixModel = require('./Appendix-Model');
const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../middleware/async');

/**
@route     (GET) - appendix
 */
exports.getAppendixs = asyncHandler(async (req, res, next) => {
	const appendixs = await AppendixModel.find();

	res.status(200).json({ success: true, data: appendixs });
});

/**
@route     (GET) - appendix/:id
 */
exports.getAppendix = asyncHandler(async (req, res, next) => {
	const appendix = await AppendixModel.findById(req.params.id);

	if (!appendix) {
		return next(new ErrorResponse(`Data not found with id of ${req.params.id}`, 404));
	}

	res.status(200).json({ success: true, data: appendix });
});

/**
@route     (POST) - appendix
 */
exports.createAppendix = asyncHandler(async (req, res, next) => {
	const createAppendix = await AppendixModel.create(req.body);

	res.status(201).json({ success: true, data: createAppendix });
});

/**
@route     (PUT) - appendix/:id
 */
exports.updateAppendix = asyncHandler(async (req, res, next) => {
	let updateAppendix = await AppendixModel.findById(req.params.id);

	if (!updateAppendix) {
		return next(new ErrorResponse(`Data not found with id of ${req.params.id}`, 404));
	}

	updateAppendix = await AppendixModel.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});
	res.status(200).json({ success: true, data: updateAppendix });
});

/**
@route     (DELETE) - appendix/:id
 */
exports.deleteAppendix = asyncHandler(async (req, res, next) => {
	let deleteAppendix = await AppendixModel.findById(req.params.id);

	if (!deleteAppendix) {
		return next(new ErrorResponse(`Data not found with id of ${req.params.id}`, 404));
	}

	deleteAppendix.remove();
	res.status(200).json({ success: true, data: {} });
});

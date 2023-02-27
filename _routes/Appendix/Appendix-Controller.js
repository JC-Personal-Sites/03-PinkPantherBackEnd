const AppendixSchema = require('./Appendix-Model');
const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../middleware/async');

exports.getAppendixs = asyncHandler(async (req, res, next) => {
	try {
		const appendixs = await AppendixSchema.find();
		
		res.status(200).json({ data: appendixs });
	} catch (err) {
		return next(new ErrorResponse(`Data not found`, 500));
	}
});

exports.getAppendix = asyncHandler(async (req, res, next) => {
	const appendix = await AppendixModel.findById(req.params.id);

	if (!appendix) {
		return next(new ErrorResponse(`Data not found with id of ${req.params.id}`, 404));
	}

	res.status(200).json({ success: true, data: appendix });
});

exports.createAppendix = asyncHandler(async (req, res, next) => {
	const createAppendix = await AppendixModel.create(req.body);

	res.status(201).json({ success: true, data: createAppendix });
});

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

exports.deleteAppendix = asyncHandler(async (req, res, next) => {
	let deleteAppendix = await AppendixModel.findById(req.params.id);

	if (!deleteAppendix) {
		return next(new ErrorResponse(`Data not found with id of ${req.params.id}`, 404));
	}

	deleteAppendix.remove();
	res.status(200).json({ success: true, data: {} });
});

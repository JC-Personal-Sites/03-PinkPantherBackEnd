const AppendixSchema = require('./Appendix-Model');
const ErrorResponse = require('../../middleware/errorResponse');
const asyncHandler = require('../../middleware/async');

exports.getAppendixs = asyncHandler(async (req, res, next) => {
	try {
		const appendixs = await AppendixSchema.find().sort({ 'id': 'asc' });
		
		res.status(200).json({ data: appendixs });
	} catch (err) {
		return next(new ErrorResponse(`Data not found`, 500));
	}
});

exports.createAppendix = asyncHandler(async (req, res, next) => {
	try {
		await AppendixSchema.create(req.body);
		res.status(201).json({ success: true });
	} catch (err) {
		return next(new ErrorResponse(`Data not able to persist to database`, 500));
	}
});

exports.updateAppendix = asyncHandler(async (req, res, next) => {
	try {
		await AppendixSchema.findByIdAndUpdate(req.body._id, req.body, {new: true,runValidators: true});
		res.status(201).json({ success: true });
	} catch (err) {
		return next(new ErrorResponse(`Data not found with id of ${req.body.id}`, 500));
	}
});

exports.deleteAppendix = asyncHandler(async (req, res, next) => {
	try {
		await AppendixSchema.deleteOne({_id: req.query.id});
		res.status(201).json({ success: true });
	} catch (err) {
		return next(new ErrorResponse(`Data not found with id of ${req.query.id}`, 404));
	}
});

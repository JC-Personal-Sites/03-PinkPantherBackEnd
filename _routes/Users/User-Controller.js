const UserSchema = require('./User-Model');
const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../middleware/async');

exports.getUsers = asyncHandler(async (req, res, next) => {
	try {
		const users = await UserSchema.find();

		res.status(200).json({ data: users });
	} catch (err) {
		return next(new ErrorResponse(`Data not found`, 500));
	}
});

exports.getUser = asyncHandler(async (req, res, next) => {
	const User = await UserModel.findById(req.params.id);

	if (!User) {
		return next(new ErrorResponse(`Data not found with id of ${req.params.id}`, 404));
	}

	res.status(200).json({ success: true, data: User });
});

exports.createUser = asyncHandler(async (req, res, next) => {
	const createUser = await UserModel.create(req.body);

	res.status(201).json({ success: true, data: createUser });
});

exports.updateUser = asyncHandler(async (req, res, next) => {
	let updateUser = await UserModel.findById(req.params.id);

	if (!updateUser) {
		return next(new ErrorResponse(`Data not found with id of ${req.params.id}`, 404));
	}

	updateUser = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});
	res.status(200).json({ success: true, data: updateUser });
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
	let deleteUser = await UserModel.findById(req.params.id);

	if (!deleteUser) {
		return next(new ErrorResponse(`Data not found with id of ${req.params.id}`, 404));
	}

	deleteUser.remove();
	res.status(200).json({ success: true, data: {} });
});

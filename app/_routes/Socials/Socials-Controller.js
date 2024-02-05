const SocialsSchema = require('./Socials-Model');
const ErrorResponse = require('../../middleware/errorResponse');
const asyncHandler = require('../../middleware/async');

exports.getSocials = asyncHandler(async (req, res, next) => {
	try {
		const socials = await SocialsSchema.find();
		// REMOVE - This is just added to show suspense working
		await new Promise(resolve => setTimeout(resolve, 2000))

		res.status(200).json({ data: socials });
	} catch (err) {
		return next(new ErrorResponse(`Data not found`, 500));
	}
});

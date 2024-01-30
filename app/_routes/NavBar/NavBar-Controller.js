const NavBarSchema = require('./NavBar-Model');
const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../middleware/async');

exports.getNavBars = asyncHandler(async (req, res, next) => {
	try {
		const navBars = await NavBarSchema.find();

		res.status(200).json({ data: navBars });
	} catch (err) {
		return next(new ErrorResponse(`Data not found`, 500));
	}
});

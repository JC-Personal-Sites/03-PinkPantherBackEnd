const ErrorResponse = require('../../middleware/errorResponse');
const asyncHandler = require('../../middleware/async');

exports.getRoot = asyncHandler(async (req, res, next) => {
  try {
    res.status(200).json({ data: { hi: 'Hi Justin How Are you?' } });
  } catch (err) {
    return next(new ErrorResponse(`Data not found`, 500));
  }
});

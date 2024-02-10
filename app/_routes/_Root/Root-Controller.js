import asyncHandler from '../../middleware/async';
import ErrorResponse from '../../middleware/errorResponse';

export const getRoot = asyncHandler(async (req, res, next) => {
  try {
    res.status(200).json({ data: { hi: 'Hi Justin How Are you?' } });
  } catch (err) {
    return next(new ErrorResponse(`Data not found`, 500));
  }
});

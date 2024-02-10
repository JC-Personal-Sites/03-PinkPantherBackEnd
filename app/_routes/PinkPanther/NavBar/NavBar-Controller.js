import asyncHandler from '../../../middleware/async';
import ErrorResponse from '../../../middleware/errorResponse';
import NavBarSchema from './NavBar-Model';

export const getNavBars = asyncHandler(async (req, res, next) => {
  try {
    const navBars = await NavBarSchema.find().sort({ id: 'asc' });

    res.status(200).json({ data: navBars });
  } catch (err) {
    return next(new ErrorResponse(`Data not found`, 500));
  }
});

export default getNavBars;

import asyncHandler from 'express-async-handler';
import ErrorResponse from '../../../middleware/errorResponse.js';
import NavBarSchema from './NavBar-Model.js';

const getNavBars = asyncHandler(async (req, res, next) => {
  try {
    const navBars = await NavBarSchema.find().sort({ id: 'asc' });

    res.status(200).json({ data: navBars });
  } catch (err) {
    return next(new ErrorResponse(`Data not found`, 500));
  }
});

export default getNavBars;

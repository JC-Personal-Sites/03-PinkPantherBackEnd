import asyncHandler from 'express-async-handler';
import ErrorResponse from '../../../middleware/errorResponse.js';
import SocialsSchema from './Socials-Model.js';

const getSocials = asyncHandler(async (req, res, next) => {
  try {
    const socials = await SocialsSchema.find();

    res.status(200).json({ data: socials });
  } catch (err) {
    return next(new ErrorResponse(`Data not found`, 500));
  }
});

export default getSocials;

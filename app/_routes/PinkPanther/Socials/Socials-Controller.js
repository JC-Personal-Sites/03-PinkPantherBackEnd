import asyncHandler from '../../../middleware/async';
import ErrorResponse from '../../../middleware/errorResponse';
import SocialsSchema from './Socials-Model';

export const getSocials = asyncHandler(async (req, res, next) => {
  try {
    const socials = await SocialsSchema.find();

    res.status(200).json({ data: socials });
  } catch (err) {
    return next(new ErrorResponse(`Data not found`, 500));
  }
});

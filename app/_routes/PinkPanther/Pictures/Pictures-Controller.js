import asyncHandler from 'express-async-handler';
import ErrorResponse from '../../../middleware/errorResponse.js';
import PictureSchema from './Pictures-Model.js';

const getPictures = asyncHandler(async (req, res, next) => {
  try {
    const pictures = await PictureSchema.find();

    res.status(200).json({ data: pictures });
  } catch (err) {
    return next(new ErrorResponse(`Data not found`, 500));
  }
});

export default getPictures;

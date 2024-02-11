import asyncHandler from 'express-async-handler';
import ErrorResponse from '../../../middleware/errorResponse.js';
import VideoSchema from './Videos-Model.js';

const getVideos = asyncHandler(async (req, res, next) => {
  try {
    const videos = await VideoSchema.find();

    res.status(200).json({ data: videos });
  } catch (err) {
    return next(new ErrorResponse(`Data not found`, 500));
  }
});

export default getVideos;

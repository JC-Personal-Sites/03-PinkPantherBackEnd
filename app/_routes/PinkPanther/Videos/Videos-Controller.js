import asyncHandler from '../../../middleware/async';
import ErrorResponse from '../../../middleware/errorResponse';
import VideoSchema from './Videos-Model';

export const getVideos = asyncHandler(async (req, res, next) => {
  try {
    const videos = await VideoSchema.find();

    res.status(200).json({ data: videos });
  } catch (err) {
    return next(new ErrorResponse(`Data not found`, 500));
  }
});

export default getVideos;

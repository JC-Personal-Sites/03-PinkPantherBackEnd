import asyncHandler from "express-async-handler"; // See notes in _Root
import VideoSchema from "./Videos-Model";

const getVideos = asyncHandler(async (req, res, next) => {
  const videos = await VideoSchema.find();
  res.status(200).json({ data: videos });
});

export default getVideos;

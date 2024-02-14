import asyncHandler from "express-async-handler";
import VideoSchema from "./Videos-Model";

const getVideos = asyncHandler(async (req, res, next) => {
  try {
    const videos = await VideoSchema.find();

    res.status(200).json({ data: videos });
  } catch (err) {
    next(res.status(500).json({ error: `Data not found` }));
  }
});

export default getVideos;

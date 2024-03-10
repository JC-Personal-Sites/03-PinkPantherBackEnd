import type { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler"; // See notes in _Root

import VideoSchema from "./Videos-Model";

const getVideos = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const videos = await VideoSchema.find();
  res.status(200).json({ status: "success", data: videos });
});

export default getVideos;

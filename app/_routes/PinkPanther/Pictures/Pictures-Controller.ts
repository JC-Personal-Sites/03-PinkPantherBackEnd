import { type NextFunction, type Request, type Response } from "express";
import asyncHandler from "express-async-handler"; // See notes in _Root

import PictureSchema from "./Pictures-Model";

const getPictures = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const pictures = await PictureSchema.find();
  res.status(200).json({ status: "success", data: pictures });
});

export default getPictures;

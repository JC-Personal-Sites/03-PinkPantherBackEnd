import asyncHandler from "express-async-handler"; // See notes in _Root
import PictureSchema from "./Pictures-Model";

const getPictures = asyncHandler(async (req, res, next) => {
  const pictures = await PictureSchema.find();
  res.status(200).json({ data: pictures });
});

export default getPictures;

import asyncHandler from "express-async-handler";
import PictureSchema from "./Pictures-Model";

const getPictures = asyncHandler(async (req, res, next) => {
  try {
    const pictures = await PictureSchema.find();

    res.status(200).json({ data: pictures });
  } catch (err) {
    next(res.status(500).json({ error: `Data not found` }));
  }
});

export default getPictures;

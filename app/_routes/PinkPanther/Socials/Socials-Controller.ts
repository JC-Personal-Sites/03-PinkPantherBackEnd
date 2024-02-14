import asyncHandler from "express-async-handler";
import SocialsSchema from "./Socials-Model";

const getSocials = asyncHandler(async (req, res, next) => {
  try {
    const socials = await SocialsSchema.find();

    res.status(200).json({ data: socials });
  } catch (err) {
    next(res.status(500).json({ error: `Data not found` }));
  }
});

export default getSocials;

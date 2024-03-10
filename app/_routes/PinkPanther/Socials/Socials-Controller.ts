import { type NextFunction, type Request, type Response } from "express";
import asyncHandler from "express-async-handler"; // See notes in _Root

import SocialsSchema from "./Socials-Model";

const getSocials = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const socials = await SocialsSchema.find();
  res.status(200).json({ status: "success", data: socials });
});

export default getSocials;

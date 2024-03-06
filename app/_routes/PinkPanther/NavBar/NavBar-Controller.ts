import { type NextFunction, type Request, type Response } from "express";
import asyncHandler from "express-async-handler"; // See notes in _Root

import NavBarSchema from "./NavBar-Model";

const getNavBars = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const navBars = await NavBarSchema.find().sort({ id: "asc" });
  res.status(200).json({ data: navBars });
});

export default getNavBars;

import asyncHandler from "express-async-handler"; // See notes in _Root
import NavBarSchema from "./NavBar-Model";

const getNavBars = asyncHandler(async (req, res, next) => {
  const navBars = await NavBarSchema.find().sort({ id: "asc" });
  res.status(200).json({ data: navBars });
});

export default getNavBars;

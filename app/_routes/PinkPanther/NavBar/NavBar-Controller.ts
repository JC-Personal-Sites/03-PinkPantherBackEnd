import asyncHandler from "express-async-handler";
import NavBarSchema from "./NavBar-Model";

const getNavBars = asyncHandler(async (req, res, next) => {
  try {
    const navBars = await NavBarSchema.find().sort({ id: "asc" });

    res.status(200).json({ data: navBars });
  } catch (err) {
    next(res.status(500).json({ error: `Data not found` }));
  }
});

export default getNavBars;

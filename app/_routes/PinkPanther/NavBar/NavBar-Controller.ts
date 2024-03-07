import { type NextFunction, type Response } from "express";
import asyncHandler from "express-async-handler"; // See notes in _Root

import type { I_RequestUser } from "../_localHelpers/modelHelper";

import NavBarSchema from "./NavBar-Model";
import RoleSchema from "../Roles/Roles-Model";

const getNavBars = asyncHandler(async (req: I_RequestUser, res: Response, next: NextFunction) => {
  const userAllowedTabs = await RoleSchema.findOne({ _id: req.user.roleId });
  const navBars = await NavBarSchema.find().sort({ id: "asc" });

  // reduce the navbar tabs by userRole
  // @ts-expect-error
  const allowedTabs = navBars.filter(({ _id }) => userAllowedTabs.navBarIds.includes(_id));
  res.status(200).json({ data: allowedTabs });
});

export default getNavBars;

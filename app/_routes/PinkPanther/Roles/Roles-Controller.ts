import asyncHandler from "express-async-handler"; // See notes in _Root
import { type NextFunction, type Request, type Response } from "express";

import RoleSchema from "./Roles-Model";

export const getRoles = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const roles = await RoleSchema.find().sort({ id: "asc" });
  res.status(200).json({ data: roles });
});

export const createRole = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  await RoleSchema.create(req.body);
  res.status(201).json({ success: true });
});

export const updateRole = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  await RoleSchema.findByIdAndUpdate(req.body._id, req.body, { new: true, runValidators: true });
  res.status(201).json({ success: true });
});

export const deleteRole = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  await RoleSchema.deleteOne({ _id: req.query.id });
  res.status(201).json({ success: true });
});

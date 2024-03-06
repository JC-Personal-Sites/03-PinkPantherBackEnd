import { type NextFunction, type Request, type Response } from "express";
import asyncHandler from "express-async-handler"; // See notes in _Root

import AppendixSchema from "./Appendix-Model";

export const getAppendixs = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const appendixs = await AppendixSchema.find().sort({ id: "asc" });
  res.status(200).json({ data: appendixs });
});

export const createAppendix = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  await AppendixSchema.create(req.body);
  res.status(201).json({ success: true });
});

export const updateAppendix = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  await AppendixSchema.findByIdAndUpdate(req.body._id, req.body, { new: true, runValidators: true });
  res.status(201).json({ success: true });
});

export const deleteAppendix = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  await AppendixSchema.deleteOne({ _id: req.query.id });
  res.status(201).json({ success: true });
});

import asyncHandler from "express-async-handler";
import AppendixSchema from "./Appendix-Model";

export const getAppendixs = asyncHandler(async (req, res, next) => {
  try {
    const appendixs = await AppendixSchema.find().sort({ id: "asc" });

    res.status(200).json({ data: appendixs });
  } catch (err) {
    next(res.status(500).json({ error: `Data not found` }));
  }
});

export const createAppendix = asyncHandler(async (req, res, next) => {
  try {
    await AppendixSchema.create(req.body);
    res.status(201).json({ success: true });
  } catch (err) {
    next(res.status(500).json({ error: `Data not able to persist to database` }));
  }
});

export const updateAppendix = asyncHandler(async (req, res, next) => {
  try {
    await AppendixSchema.findByIdAndUpdate(req.body._id, req.body, { new: true, runValidators: true });
    res.status(201).json({ success: true });
  } catch (err) {
    next(res.status(500).json({ error: `Data not found with id of ${req.body.id}` }));
  }
});

export const deleteAppendix = asyncHandler(async (req, res, next) => {
  try {
    await AppendixSchema.deleteOne({ _id: req.query.id });
    res.status(201).json({ success: true });
  } catch (err) {
    next(res.status(404).json({ error: `Data not found with id of ${req.query.id as string}` }));
  }
});

import asyncHandler from "express-async-handler"; // See notes in _Root

export const registerAuth = asyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true });
});

export const loginAuth = asyncHandler(async (req, res, next) => {
  res.status(200).json({ data: { test: "test" } });
});

export const forgotPasswordAuth = asyncHandler(async (req, res, next) => {
  res.status(201).json({ success: true });
});

export const approveResetAuth = asyncHandler(async (req, res, next) => {
  res.status(201).json({ success: true });
});

export const resetPasswordAuth = asyncHandler(async (req, res, next) => {
  res.status(201).json({ success: true });
});

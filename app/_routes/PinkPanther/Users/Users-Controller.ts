// JH - None of this has been coded out correctly yet

import type { NextFunction, Response, Request } from "express";
import asyncHandler from "express-async-handler"; // See notes in _Root

import type { I_RequestUser } from "../Users/Users-Model";
import UserSchema from "./Users-Model";

export const getUsers = asyncHandler(async (req: I_RequestUser, res: Response, next: NextFunction) => {
  try {
    const users = await UserSchema.find();

    res.status(200).json({ status: "success", data: users });
  } catch (err) {
    next(err);
  }
});

export const createUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { firstName, lastName, emailAddress, password } = req.body;

  const lastUser = await UserSchema.find().sort({ id: -1 }).limit(1);
  const newId: number = lastUser[0].id + 1;

  await UserSchema.create({
    id: newId,
    firstName,
    lastName,
    emailAddress,
    logonData: {
      password,
    },
  });

  res.status(201).json({ status: "success" });
});

export const updateUser = asyncHandler(async (req: I_RequestUser, res: Response, next: NextFunction) => {
  let updateUser = await UserSchema.findById(req.params.id);

  if (!updateUser) {
    next(res.status(404).json({ status: "error", message: `Data not found with id of ${req.params.id}` }));
    return;
  }

  updateUser = await UserSchema.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(202).json({ status: "success", data: updateUser });
});

export const deleteUser = asyncHandler(async (req: I_RequestUser, res: Response, next: NextFunction) => {
  const deleteUser = await UserSchema.findById(req.params.id);

  if (!deleteUser) {
    next(res.status(404).json({ status: "error", message: `Data not found with id of ${req.params.id}` }));
    return;
  }

  // deleteUser.remove();
  res.status(202).json({ status: "success" });
});

export default getUsers;

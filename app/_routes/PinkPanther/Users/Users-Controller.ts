// JH - None of this has been coded out correctly yet

import { type NextFunction, type Request, type Response } from "express";
import asyncHandler from "express-async-handler"; // See notes in _Root

import RoleSchema from "../Roles/Roles-Model";
import setTokenResponse from "../_localHelpers/tokenHelper";
import UserSchema from "./Users-Model";

export const getUsers = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await UserSchema.find();

    res.status(200).json({ data: users });
  } catch (err) {
    next(err);
  }
});

export const getUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const User = await UserSchema.findById(req.params.id);

  if (!User) {
    next(res.status(404).json({ error: `Data not found with id of ${req.params.id}` }));
    return;
  }

  res.status(200).json({ success: true, data: User });
});

export const createUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { id, firstName, lastName, phoneNumber, emailAddress, roleId, password } = req.body;

  const roleName = await RoleSchema.findOne({
    _id: roleId ?? "65e86cebf51a1dfb57fb9e26",
  });

  const userDetails = await UserSchema.create({
    id,
    firstName,
    lastName,
    phoneNumber,
    emailAddress,
    roleId,
    role: roleName?.role,
    ableToEdit: roleName?.ableToEdit,
    logonData: {
      password,
    },
  });

  setTokenResponse(userDetails, 200, res);
});

export const updateUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  let updateUser = await UserSchema.findById(req.params.id);

  if (!updateUser) {
    next(res.status(404).json({ error: `Data not found with id of ${req.params.id}` }));
    return;
  }

  updateUser = await UserSchema.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, data: updateUser });
});

export const deleteUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const deleteUser = await UserSchema.findById(req.params.id);

  if (!deleteUser) {
    next(res.status(404).json({ error: `Data not found with id of ${req.params.id}` }));
    return;
  }

  // deleteUser.remove();
  res.status(200).json({ success: true, data: {} });
});

export default getUsers;

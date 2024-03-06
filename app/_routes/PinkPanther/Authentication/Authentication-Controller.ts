import asyncHandler from "express-async-handler"; // See notes in _Root
import UserSchema from "../Users/Users-Model";
import RoleSchema from "../Roles/Roles-Model";

export const registerAuth = asyncHandler(async (req, res, next) => {
  const { id, firstName, lastName, phoneNumber, emailAddress, roleId, password } = req.body;

  const roleName = await RoleSchema.findOne({
    _id: roleId ?? "65e86cebf51a1dfb57fb9e26",
  });

  const user = await UserSchema.create({
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

  // @ts-expect-error
  const token = user.getToken();

  res.status(200).json({ success: true, token });
});

export const loginAuth = asyncHandler(async (req, res, next) => {
  // @ts-expect-error
  console.log(req.rateLimit);
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

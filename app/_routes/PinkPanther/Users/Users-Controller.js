import asyncHandler from 'express-async-handler';
import ErrorResponse from '../../../middleware/errorResponse.js';
import UserSchema from './Users-Model.js';

export const getUsers = asyncHandler(async (req, res, next) => {
  try {
    const users = await UserSchema.find();

    res.status(200).json({ data: users });
  } catch (err) {
    return next(new ErrorResponse(`Data not found`, 500));
  }
});

export const getUser = asyncHandler(async (req, res, next) => {
  const User = await UserModel.findById(req.params.id);

  if (!User) {
    return next(new ErrorResponse(`Data not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({ success: true, data: User });
});

export const createUser = asyncHandler(async (req, res, next) => {
  const createUser = await UserModel.create(req.body);

  res.status(201).json({ success: true, data: createUser });
});

export const updateUser = asyncHandler(async (req, res, next) => {
  let updateUser = await UserModel.findById(req.params.id);

  if (!updateUser) {
    return next(new ErrorResponse(`Data not found with id of ${req.params.id}`, 404));
  }

  updateUser = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, data: updateUser });
});

export const deleteUser = asyncHandler(async (req, res, next) => {
  let deleteUser = await UserModel.findById(req.params.id);

  if (!deleteUser) {
    return next(new ErrorResponse(`Data not found with id of ${req.params.id}`, 404));
  }

  deleteUser.remove();
  res.status(200).json({ success: true, data: {} });
});

export default getUsers;

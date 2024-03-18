import type { NextFunction, Response } from "express";
import asyncHandler from "express-async-handler"; // See notes in _Root

import setTokenResponse from "../_localHelpers/tokenHelper";
import type { I_RequestUser } from "../Users/Users-Model";
import UserSchema from "../Users/Users-Model";

export const login = asyncHandler(async (req: I_RequestUser, res: Response, next: NextFunction) => {
  const { emailAddress, password } = req.body;

  if (req.rateLimit.remaining === 0) {
    next(
      res
        .status(429)
        .json({ status: "error", message: "Your account is locked, please use the forgotten password link" })
    );
  }

  req.user = await UserSchema.findOne({ emailAddress }).select("+logonData.password");

  if (!req.user) {
    next(res.status(401).json({ status: "error", message: "Invalid Credentials" }));
  }

  if (req.user?.logonData?.numberOfFailedLogons === 5) {
    next(res.status(403).json({ status: "error", message: "Account is Locked please contact admin" }));
  }

  const matched = await Promise.resolve(req.user.matchPassword(password));

  if (!matched) {
    const loginFails = req.user?.logonData?.numberOfFailedLogons ? req.user.logonData.numberOfFailedLogons++ : 1;
    await UserSchema.updateOne(
      {
        _id: req.user._id,
      },
      {
        $set: {
          "logonData.numberOfFailedLogons": loginFails,
        },
      }
    );

    if (loginFails >= 5) {
      console.error("overlogins");
      await UserSchema.updateOne(
        {
          _id: req.user._id,
        },
        {
          $set: {
            "logonData.lockedOutDateTime": new Date(),
            "logonData.lockedOut": true,
          },
        }
      );
    }
    next(res.status(403).json({ status: "error", message: "Invalid Credentials" }));
  }

  await UserSchema.updateOne(
    {
      _id: req.user._id,
    },
    {
      $set: {
        "logonData.numberOfFailedLogons": 0,
        "logonData.lastLogonDateTime": new Date(),
      },
    }
  );

  setTokenResponse(req, 200, res, "login");
});

export const loggedIn = asyncHandler(async (req: I_RequestUser, res: Response, next: NextFunction) => {
  res.status(201).json({ status: "success" });
});

export const logout = asyncHandler(async (req: I_RequestUser, res: Response, next: NextFunction) => {
  setTokenResponse(req, 201, res, "logout");
});

export const forgotPassword = asyncHandler(async (req: I_RequestUser, res: Response, next: NextFunction) => {
  res.status(201).json({ status: "success" });
});

export const approveReset = asyncHandler(async (req: I_RequestUser, res: Response, next: NextFunction) => {
  res.status(201).json({ status: "success" });
});

export const resetPassword = asyncHandler(async (req: I_RequestUser, res: Response, next: NextFunction) => {
  res.status(201).json({ status: "success" });
});

import type { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler"; // See notes in _Root

import setTokenResponse from "../_localHelpers/tokenHelper";
import UserSchema from "../Users/Users-Model";

export const login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { emailAddress, password } = req.body;

  // @ts-expect-error
  if (req.rateLimit.remaining === 0) {
    next(res.status(429).json({ error: "Your account is locked, please use the forgotten password link" }));
  }

  const userDetails = await UserSchema.findOne({ emailAddress }).select("+logonData.password");

  if (!userDetails) {
    next(res.status(401).json({ error: "Invalid Credentials" }));
  }

  if (userDetails?.logonData?.numberOfFailedLogons === 5) {
    next(res.status(403).json({ error: "Account is Locked please contact admin" }));
  }

  // @ts-expect-error
  const matched = await userDetails.matchPassword(password);

  if (!matched) {
    const loginFails = userDetails?.logonData?.numberOfFailedLogons ? userDetails.logonData.numberOfFailedLogons++ : 1;
    await UserSchema.updateOne(
      {
        _id: userDetails._id,
      },
      {
        $set: {
          "logonData.numberOfFailedLogons": loginFails,
        },
      }
    );

    if (loginFails >= 5) {
      console.log("overlogins");
      await UserSchema.updateOne(
        {
          _id: userDetails._id,
        },
        {
          $set: {
            "logonData.lockedOutDateTime": new Date(),
            "logonData.lockedOut": true,
          },
        }
      );
    }
    next(res.status(403).json({ error: "Invalid Credentials" }));
  }

  await UserSchema.updateOne(
    {
      _id: userDetails._id,
    },
    {
      $set: {
        "logonData.numberOfFailedLogons": 0,
        "logonData.lastLogonDateTime": new Date(),
      },
    }
  );

  setTokenResponse(userDetails, 200, res);
});

export const logout = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.status(201).json({ success: true });
});

export const forgotPassword = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.status(201).json({ success: true });
});

export const approveReset = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.status(201).json({ success: true });
});

export const resetPassword = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.status(201).json({ success: true });
});

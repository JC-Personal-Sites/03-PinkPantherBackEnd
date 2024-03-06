import asyncHandler from "express-async-handler"; // See notes in _Root

import RoleSchema from "../Roles/Roles-Model";
import UserSchema from "../Users/Users-Model";

export const register = asyncHandler(async (req, res, next) => {
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

export const login = asyncHandler(async (req, res, next) => {
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
  // @ts-expect-error
  const tokenData = userDetails.getToken();

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

  res.cookie(process.env.JWT_FGP_COOKIENAME, tokenData.fingerprint, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: +process.env.JWT_FGP_COOKIE_EXPIRYTIME,
  });

  res.status(200).json({ message: "Login successful", token: tokenData.token });
});

export const forgotPassword = asyncHandler(async (req, res, next) => {
  res.status(201).json({ success: true });
});

export const approveReset = asyncHandler(async (req, res, next) => {
  res.status(201).json({ success: true });
});

export const resetPassword = asyncHandler(async (req, res, next) => {
  res.status(201).json({ success: true });
});

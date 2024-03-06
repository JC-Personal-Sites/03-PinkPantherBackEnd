import Crypto from "crypto";
import { type NextFunction, type Request, type Response } from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import UserSchema from "../Users/Users-Model";

// Protect routes
export const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.cookies[process.env.JWT_FGP_COOKIENAME] || !req.cookies.token) {
    next(res.status(403).json({ message: "No token provided" }));
  }

  const token = req.cookies.token;
  const userFingerprint = req.cookies[process.env.JWT_FGP_COOKIENAME];

  if (!token || !userFingerprint) {
    console.log("token & FGP check");
    next(res.status(401).json({ error: "Not authorized" }));
  }

  if (typeof userFingerprint !== "string") {
    console.log("check type string");
    next(res.status(401).json({ error: "Not authorized" }));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // @ts-expect-error
    if (decoded.userFingerPrint !== Crypto.createHash("sha256").update(userFingerprint).digest("hex")) {
      console.log("FGP check");
      next(res.status(401).json({ error: "Not authorized" }));
    }

    // @ts-expect-error
    req.user = await UserSchema.findById(decoded.userId);

    next();
  } catch (err) {
    next(res.status(401).json({ error: "Not authorized Error" }));
  }
});

// Grant access to specific roles
export const authorizedRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // @ts-expect-error
    if (!roles.includes(req.user.role)) {
      // @ts-expect-error
      next(res.status(403).json({ error: `User role ${req.user.role} is not authorized to access this route` }));
    }
    next();
  };
};

export default protect;

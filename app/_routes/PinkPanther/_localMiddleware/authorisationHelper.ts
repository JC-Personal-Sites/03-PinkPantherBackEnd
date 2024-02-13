import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import UserSchema from "../Users/Users-Model";

// Protect routes
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(" ")[1];
    // Set token from cookie
  }
  // else if (req.cookies.token) {
  //   token = req.cookies.token;
  // }

  // Make sure token exists
  if (!token) {
    return next(res.status(401).json({ error: "Not authorized to access this route" }));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await UserSchema.findById(decoded.id);

    next();
  } catch (err) {
    return next(res.status(401).json({ error: "Not authorized to access this route" }));
  }
});

// Grant access to specific roles
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(res.status(403).json({ error: `User role ${req.user.role} is not authorized to access this route` }));
    }
    next();
  };
};

export default protect;

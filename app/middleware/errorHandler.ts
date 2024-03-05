// Express midddleware to handle errors
import type { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // This has been created so we send a JSON response which can be handled on the FE
  const error = { ...err };

  error.message = err.message;

  // Log to console the error object
  console.log(err.stack.red);

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    error.message = `Resource not found ${err.value}`;
    error.statusCode = 404;
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    error.message = "Duplicate field value entered";
    error.statusCode = 400;
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    error.message = Object.values(err.errors).map((v: any) => v.message);
    error.statusCode = 400;
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

export default errorHandler;

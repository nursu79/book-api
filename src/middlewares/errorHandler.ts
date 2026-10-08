import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError.js";
import { config } from "../config/env.js";

export const globalErrorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
): void => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const status = err instanceof AppError ? err.status : "error";

  // Handle invalid Mongoose ObjectId errors (CastError)
  if (err.name === "CastError") {
    res.status(400).json({
      success: false,
      status: "fail",
      message: "Invalid resource ID format",
    });
    return;
  }

  // Send production vs development error response
  res.status(statusCode).json({
    success: false,
    status,
    message: err.message || "Internal Server Error",
    ...(config.nodeEnv === "development" && { stack: err.stack }),
  });
};

import express, { NextFunction } from "express";
import { ValidateError } from "tsoa";

export default function errorHandler(
  err: unknown,
  req: express.Request,
  res: express.Response,
  next: NextFunction
): express.Response | void {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: "Validation Failed",
      details: err?.fields,
    });
  }
  if (err instanceof Error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }

  next();
}

import express, { NextFunction } from "express";
import { ValidateError } from "tsoa";

import { iocContainer } from "@/ioc";
import LoggerInterface from "@/util/LoggerInterface";

export default function errorHandler(
  err: unknown,
  req: express.Request,
  res: express.Response,
  next: NextFunction
): express.Response | void {

  const logger = iocContainer.get<LoggerInterface>("LoggerInterface");

  if (err instanceof ValidateError) {
    logger.warn(`Caught Validation Error for ${req.path}:` + err.fields);
    return res.status(422).json({
      message: "Validation Failed",
      details: err?.fields,
    });
  }

  if (err instanceof Error) {
    logger.warn(`Caught Internal Server Error for ${req.path}:` + err.stack);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }

  next();
}

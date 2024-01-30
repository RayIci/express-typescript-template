import winston from "winston";
import * as path from "path";

import LoggerInterface from "./LoggerInterface";
import { LoadEnv } from "@/helpers/envHelper";
import { injectable } from "inversify";

LoadEnv

@injectable()
export default class Logger implements LoggerInterface {
  public logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    defaultMeta: { service: "express server" },
    transports: [
      // - Write all logs with importance level of `error` or less to `error.log`
      new winston.transports.File({
        filename:
          process.env.LOG_FOLDER !== undefined
            ? path.join(process.env.LOG_FOLDER, "error.log")
            : "error.log",
        level: "error",
      }),

      // - Write all logs with importance level of `info` or less to `combined.log`
      new winston.transports.File({
        filename:
          process.env.LOG_FOLDER !== undefined
            ? path.join(process.env.LOG_FOLDER, "combined.log")
            : "combined.log",
        level: "info",
      }),
    ],
  });
  constructor() {
    if (process.env.NODE_ENV?.toLocaleLowerCase() !== "production") {
      this.logger.add(
        new winston.transports.Console({
          format: winston.format.simple(),
        })
      );
    }
  }

  public info(content: any) {
    this.logger.info(content);
  }

  public warn(content: any) {
    this.logger.warn(content);
  }

  public error(content: any) {
    this.logger.error(content);
  }
}

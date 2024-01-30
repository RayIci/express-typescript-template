import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import SwaggerUi from "swagger-ui-express";

import { RegisterRoutes } from "../build_tsoa/routes";
import errorHandler from "@/errorHandler";

export const app = express();

app.use(compression());
app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());

app.use(
  "/docs",
  SwaggerUi.serve,
  async (_req: express.Request, res: express.Response) => {
    return res.send(
      SwaggerUi.generateHTML(await import("../build_tsoa/swagger.json"))
    );
  }
);

RegisterRoutes(app);

app.use(function notFoundHandler(_req, res: express.Response) {
  res.status(404).send({
    message: "Not Found",
  });
});

app.use(errorHandler);

import { app } from "@/app";
import { LoadEnv } from "./helpers/envHelper";

import { iocContainer } from "@/ioc";
import LoggerInterface from "@/util/LoggerInterface";

LoadEnv();

const logger = iocContainer.get<LoggerInterface>("Logger");

const port = process.env.PORT || 3000;

export default () => {
  app.listen(port, () => {
    logger.info(`Server listening on http://localhost:${port} (Docs on http://localhost:${port}/docs)`);
  });
};

import { Container, decorate, injectable } from "inversify";
import { buildProviderModule } from "inversify-binding-decorators";
import { Controller } from "tsoa";

import LoggerInterface from "@/util/LoggerInterface";
import Logger from "@/util/Logger";

const iocContainer = new Container();

// Makes tsoa's Controller injectable
decorate(injectable(), Controller); 

// make inversify aware of inversify-binding-decorators
iocContainer.load(buildProviderModule());

iocContainer.bind<LoggerInterface>("Logger").to(Logger).inSingletonScope();

// export according to convention
export { iocContainer };

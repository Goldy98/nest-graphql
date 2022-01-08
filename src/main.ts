import { ConsoleLogger, Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { logger } from "./helpers";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger });
  await app.listen(3000);

  app.useGlobalPipes(new ValidationPipe());

  logger.log(
    `Nest Application started and runnning on : ${await app.getUrl()}`
  );
}
bootstrap();

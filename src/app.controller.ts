import { Controller, Get, Logger } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  getLogger() {
    return this.logger;
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

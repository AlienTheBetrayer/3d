import { Global, Module } from "@nestjs/common";
import { DrizzleService } from "./drizzle.service.js";
import { AppConfigModule } from "../config/config.module.js";

@Global()
@Module({
  imports: [AppConfigModule],
  providers: [DrizzleService],
  exports: [DrizzleService],
})
export class DrizzleModule {}

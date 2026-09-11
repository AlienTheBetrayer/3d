import { Global, Module } from "@nestjs/common";
import { AuthCoreService } from "./auth.service.js";

@Global()
@Module({
  providers: [AuthCoreService],
  exports: [AuthCoreService],
})
export class AuthCoreModule {}

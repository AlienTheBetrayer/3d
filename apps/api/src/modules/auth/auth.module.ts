import { Global, Module } from "@nestjs/common";

import { UserModule } from "../user/user.module.js";
import { VerifyModule } from "../verify/verify.module.js";
import { AuthController } from "./auth.controller.js";
import { AuthService } from "./auth.service.js";

@Global()
@Module({
  imports: [VerifyModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}

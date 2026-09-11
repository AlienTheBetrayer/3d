import { Global, Module } from "@nestjs/common";
import { MailModule } from "../mail/mail.module.js";
import { VerifyService } from "./verify.service.js";

@Global()
@Module({
  imports: [MailModule],
  providers: [VerifyService],
  exports: [VerifyService],
})
export class VerifyModule {}

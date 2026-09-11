import { Global, Module } from "@nestjs/common";
import { AppJwtService } from "./jwt.service.js";

@Global()
@Module({
  exports: [AppJwtService],
  providers: [AppJwtService],
})
export class AppJwtModule {}

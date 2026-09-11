import { Module } from "@nestjs/common";
import { RootModule } from "./modules/root/root.module.js";
import { DrizzleModule } from "./modules/drizzle/drizzle.module.js";
import { AuthCoreModule } from "./modules/auth-core/auth.module.js";
import { OAuthModule } from "./modules/auth-oauth/oauth.module.js";
import { AuthModule } from "./modules/auth/auth.module.js";
import { ConnectionsModule } from "./modules/connections/connections.module.js";
import { AppJwtModule } from "./modules/jwt/jwt.module.js";
import { MailModule } from "./modules/mail/mail.module.js";
import { UserModule } from "./modules/user/user.module.js";
import { VerifyModule } from "./modules/verify/verify.module.js";
import { AppConfigModule } from "./modules/config/config.module.js";

const imports = [
  RootModule,
  AppConfigModule,
  DrizzleModule,
  AuthModule,
  OAuthModule,
  MailModule,
  UserModule,
  VerifyModule,
  AppJwtModule,
  AuthCoreModule,
  ConnectionsModule,
];

@Module({
  imports,
})
export class AppModule {}

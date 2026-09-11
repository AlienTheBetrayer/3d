import { Module } from "@nestjs/common";
import { AppJwtModule } from "../jwt/jwt.module.js";
import { UserModule } from "../user/user.module.js";
import { DiscordStrategy } from "./external/discord.service.js";
import { GithubStrategy } from "./external/github.service.js";
import { GoogleStrategy } from "./external/google.service.js";
import { OAuthController } from "./oauth.controller.js";
import { OAuthService } from "./oauth.service.js";

/**
 * all oauth services
 */
const services = [GoogleStrategy, GithubStrategy, DiscordStrategy];

@Module({
  imports: [AppJwtModule, UserModule],
  controllers: [OAuthController],
  providers: [OAuthService, ...services],
})
export class OAuthModule {}

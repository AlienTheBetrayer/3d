import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import Strategy, { Profile } from "passport-discord";
import { AppConfigService } from "../../config/config.service.js";
import { OAuthIdentityType } from "../decorators/oauthidentity.decorator.js";
import { oAuthIdentityMetadata } from "../oauth.types.js";

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, "discord") {
  constructor(configService: AppConfigService) {
    super({
      clientID: configService.get("DISCORD_CLIENT_ID"),
      clientSecret: configService.get("DISCORD_CLIENT_SECRET"),
      callbackURL: "http://localhost:3001/oauth/discord/callback",
      scope: ["identify", "email"],
      passReqToCallback: true,
    });
  }

  async validate(req: Request, _accessToken: string, _refreshToken: string, profile: Profile) {
    // metadata
    const metadata = JSON.parse((req.query.state as string) ?? "{}") as oAuthIdentityMetadata;

    const data: OAuthIdentityType = {
      provider: "discord",
      providerId: profile.id,
      email: profile.email || profile.emails?.[0]?.value,
      name: profile.global_name || profile.displayName,
      profileUrl: profile.avatar ?? undefined,
      metadata,
    };

    // error handling
    if (!data.email) {
      data.error = "EMAIL_NOT_FOUND";
    }

    return data;
  }
}

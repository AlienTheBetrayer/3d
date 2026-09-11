import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { Profile, Strategy } from "passport-google-oauth20";
import { AppConfigService } from "../../config/config.service.js";
import { OAuthIdentityType } from "../decorators/oauthidentity.decorator.js";
import { oAuthIdentityMetadata } from "../oauth.types.js";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(configService: AppConfigService) {
    super({
      clientID: configService.get("GOOGLE_CLIENT_ID"),
      clientSecret: configService.get("GOOGLE_CLIENT_SECRET"),
      callbackURL: "http://localhost:3001/oauth/google/callback",
      scope: ["email", "profile"],
      passReqToCallback: true,
    });
  }

  validate(req: Request, _accessToken: string, _refreshToken: string, profile: Profile) {
    const metadata = JSON.parse((req.query.state as string) ?? "{}") as oAuthIdentityMetadata;

    const data: OAuthIdentityType = {
      provider: "google",
      providerId: profile.id,
      email: profile.emails?.[0]?.value,
      name: profile.displayName || profile.username || "Unnamed",
      profileUrl: profile.profileUrl,
      metadata,
    };

    // error handling
    if (!data.email) {
      data.error = "EMAIL_NOT_FOUND";
    }

    return data;
  }
}

import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { Profile, Strategy } from "passport-github2";
import { AppConfigService } from "../../config/config.service.js";
import { OAuthIdentityType } from "../decorators/oauthidentity.decorator.js";
import { oAuthIdentityMetadata, GithubUserEmails } from "../oauth.types.js";

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, "github") {
  constructor(configService: AppConfigService) {
    super({
      clientID: configService.get("GITHUB_CLIENT_ID"),
      clientSecret: configService.get("GITHUB_CLIENT_SECRET"),
      callbackURL: "http://localhost:3001/oauth/github/callback",
      scope: ["user:email"],
      passReqToCallback: true,
    });
  }

  async validate(req: Request, _accessToken: string, _refreshToken: string, profile: Profile) {
    // metadata
    const metadata = JSON.parse((req.query.state as string) ?? "{}") as oAuthIdentityMetadata;

    const data: OAuthIdentityType = {
      provider: "github",
      providerId: profile.id,
      email: profile.emails?.[0]?.value,
      name: profile.displayName || profile.username || "Unnamed",
      profileUrl: profile.profileUrl,
      metadata,
    };

    if (data.email) {
      return data;
    }

    // email not found - getting the email
    const emails = (await (
      await fetch("https://api.github.com/user/emails", {
        headers: {
          Authorization: `Bearer ${_accessToken}`,
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2026-03-10",
        },
      })
    ).json()) as GithubUserEmails[];

    const email = emails.find((e) => e.primary);
    data.email = email?.email;

    // error handling
    if (!email?.email) {
      data.error = "EMAIL_NOT_FOUND";
    }

    return data;
  }
}

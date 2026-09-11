import { Injectable } from "@nestjs/common";
import { Response } from "express";
import { DrizzleService } from "../drizzle/drizzle.service.js";
import { db } from "@repo/db";
import { eq } from "drizzle-orm";
import { AuthContextType } from "../auth-core/decorators/authcontext.decorator.js";
import { ConnectionsService } from "../connections/connections.service.js";
import { AppJwtService } from "../jwt/jwt.service.js";
import { UserService } from "../user/user.service.js";
import { OAuthIdentityType } from "./decorators/oauthidentity.decorator.js";
import { redirectErrorURL } from "./oauth.types.js";
import { Exception } from "../../shared/lib/exception.js";

@Injectable()
export class OAuthService {
  constructor(
    private readonly drizzleService: DrizzleService,
    private readonly jwtService: AppJwtService,
    private readonly userService: UserService,
    private readonly connectionsService: ConnectionsService,
  ) {}

  /**
   * finished authentication session
   * @param request request object
   * @param response response object
   * @returns redirects the user back to the frontend
   */
  async callback(identity: OAuthIdentityType, ctx: AuthContextType, response: Response) {
    // handling error
    if (identity?.error) {
      response.redirect(redirectErrorURL(identity.error));
    }

    // login upon success
    if (identity) {
      await this.login(identity, ctx, response);
    }

    response.redirect("http://localhost:3000/login");
  }

  /**
   * oauth-specific login
   * @param response response object
   * @param ouser user object retrieved from oauth
   * @returns user object and tokens + session
   */
  async login(identity: OAuthIdentityType, ctx: AuthContextType, response: Response) {
    // user
    const { user } = await this.createUser(identity);

    if (!user) {
      throw Exception.notFound("USER_NOT_FOUND", "user not found.");
    }

    // authentication process
    switch (identity?.metadata.action) {
      case "connect": {
        if (!identity.metadata.groupId) {
          throw Exception.badRequest("INVALID_REQUEST", "groupId is required for the connection mode.");
        }

        await this.connectionsService.connectionCreate({
          groupId: identity.metadata.groupId,
          userId: user.id,
        });
        break;
      }
      default: {
        // tokens + hashing + session
        const { accessToken, refreshToken } = await this.jwtService.issueAuthData({
          userId: user.id,
          ctx,
          config: { createGroup: true },
        });

        this.jwtService.setAuthHttpCookies({
          accessToken,
          refreshToken,
          response,
        });
        break;
      }
    }

    return { user };
  }

  async createUser(identity: OAuthIdentityType) {
    // does the user have an email?
    if (!identity?.email) {
      throw Exception.notFound("EMAIL_NOT_FOUND", "identity has no email attached.");
    }

    // does the user already exist?
    let user = await this.drizzleService.db.query.users.findFirst({ where: eq(db.users.email, identity.email) });

    // user doesn't exist? - create
    if (!user) {
      user = await this.userService.create({
        email: identity.email,
        username: identity.name,
        password: null,
      });
    }

    return { user };
  }
}

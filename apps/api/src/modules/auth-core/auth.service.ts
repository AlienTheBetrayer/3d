import { Injectable } from "@nestjs/common";
import bcrypt from "bcryptjs";
import { Request } from "express";
import { DrizzleService } from "../drizzle/drizzle.service.js";
import { db } from "@repo/db";
import { AppJwtService } from "../jwt/jwt.service.js";

@Injectable()
export class AuthCoreService {
  constructor(
    private readonly drizzleService: DrizzleService,
    private readonly jwtService: AppJwtService,
  ) {}

  /**
   * verifies the authentication session from the request.
   * allows if access is valid or access is invalid but refresh is valid
   * @param request  request object
   * @returns true if verified, otherwise throws.
   */
  async verify(request: Request) {
    // no token found whatsoever
    if (
      (!("refreshToken" in request.cookies) || !request.cookies["refreshToken"]) &&
      (!("accessToken" in request.cookies) || !request.cookies["accessToken"])
    ) {
      throw new Error("no token found.");
    }

    const fn = async (type: "access" | "refresh") => {
      try {
        const token = request.cookies[type === "access" ? "accessToken" : "refreshToken"] as string;

        // verifying the refresh token
        const verified = this.jwtService.verify({
          token,
          key: type === "access" ? "ACCESS_TOKEN_SECRET" : "REFRESH_TOKEN_SECRET",
        });

        // verifying the session
        const found = await this.drizzleService.db.query.auth_sessions.findFirst({
          where: (authSessions, { and, eq }) =>
            and(eq(authSessions.id, verified.sessionId), eq(authSessions.user_id, verified.userId)),
          with: {
            users: true,
          },
        });

        if (!found) {
          throw new Error("session not found in the database.");
        }

        // verifying the hash
        if (type === "refresh" && !(await bcrypt.compare(token, found.refresh_token_hash))) {
          throw new Error("jwt hash is not verified.");
        }

        const { users, ...session } = found;

        // setting user
        request.user ??= { ...(users satisfies db.Users), session };

        return true;
      } catch (e) {
        throw new Error(e instanceof Error ? e.message : "jwt token is not verified.");
      }
    };

    try {
      return await fn("access");
    } catch {
      return await fn("refresh");
    }
  }
}

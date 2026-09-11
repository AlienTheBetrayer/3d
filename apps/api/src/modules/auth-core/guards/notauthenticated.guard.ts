import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { oAuthIdentitySchema } from "../../auth-oauth/oauth.types.js";
import { AuthCoreService } from "../auth.service.js";
import { RequestParser } from "../../../shared/index.js";
import { Exception } from "../../../shared/lib/exception.js";

@Injectable()
export class NotAuthenticatedGuard implements CanActivate {
  constructor(
    private readonly authCoreService: AuthCoreService,
    private readonly reflector: Reflector,
  ) {}

  /**
   * inverted version of the standard verify
   * @param request request object
   * @returns true if we're not authenticated, throws if we're authenticated
   */
  private async verify(request: Request) {
    // throws if not verified
    try {
      await this.authCoreService.verify(request);
    } catch {
      return true;
    }

    throw new Error();
  }

  async canActivate(context: ExecutionContext) {
    // parsing
    const request: Request = context.switchToHttp().getRequest();
    const parser = new RequestParser(request);

    try {
      const { action } = parser.body({
        action: oAuthIdentitySchema.shape.metadata.shape.action,
      });
      const identity = parser.identity();

      // passing if connection mode
      if (identity.metadata.action === "connect" || action === "connect") {
        return true;
      }
    } catch {
      /** */
    }

    try {
      return await this.verify(request);
    } catch (e) {
      // optional redirect
      const redirectURL = this.reflector.get<string | undefined>(
        "authentication-failure-redirect",
        context.getHandler(),
      );

      const message = e instanceof Error ? e.message : null;
      throw Exception.forbidden(
        "ALREADY_AUTHORIZED",
        message ?? "already authenticated, this route is only available for unauthenticated users.",
        {
          redirectURL,
        },
      );
    }
  }
}

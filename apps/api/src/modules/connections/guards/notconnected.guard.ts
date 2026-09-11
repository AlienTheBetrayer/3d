import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { ConnectionsCoreService } from "../connections-core.service.js";
import { Exception } from "../../../shared/lib/exception.js";

@Injectable()
export class NotConnectedGuard implements CanActivate {
  constructor(
    private readonly connectionsCoreService: ConnectionsCoreService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();

    try {
      return await this.connectionsCoreService.verifyOAuthConnection(request);
    } catch (e) {
      // optional redirect
      const redirectURL = this.reflector.get<string | undefined>("connection-failure-redirect", context.getHandler());

      const message = e instanceof Error ? e.message : null;
      throw Exception.unauthorized("UNAUTHORIZED", message ?? "user is not connected.", { redirectURL });
    }
  }
}

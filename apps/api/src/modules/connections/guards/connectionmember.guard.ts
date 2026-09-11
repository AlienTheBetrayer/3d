import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import { ConnectionsCoreService } from "../connections-core.service.js";
import { Exception } from "../../../shared/lib/exception.js";

@Injectable()
export class ConnectionMemberGuard implements CanActivate {
  constructor(private readonly connectionCoreService: ConnectionsCoreService) {}

  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();

    try {
      return await this.connectionCoreService.verifyConnection(request, "membership");
    } catch (e) {
      const message = e instanceof Error ? e.message : null;
      throw Exception.unauthorized("UNAUTHORIZED", message ?? "only allowed for members.");
    }
  }
}

import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import { Exception } from "../../../shared/lib/exception.js";
import { ConnectionsCoreService } from "../connections-core.service.js";

@Injectable()
export class GroupMemberGuard implements CanActivate {
  constructor(private readonly connectionCoreService: ConnectionsCoreService) {}

  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();

    try {
      return await this.connectionCoreService.verifyGroup(request, "membership");
    } catch (e) {
      const message = e instanceof Error ? e.message : null;
      throw Exception.unauthorized("UNAUTHORIZED", message ?? "only allowed for members.");
    }
  }
}

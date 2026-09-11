import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import { ConnectionsCoreService } from "../connections-core.service.js";
import { Exception } from "../../../shared/lib/exception.js";

@Injectable()
export class GroupNotMemberGuard implements CanActivate {
  constructor(private readonly connectionCoreService: ConnectionsCoreService) {}

  /**
   * inverted version of verify membership.
   * @param request request object
   * @returns true if not member, throws if member
   */
  private async verify(request: Request) {
    // throws if not verified
    try {
      await this.connectionCoreService.verifyGroup(request, "membership");
    } catch {
      return true;
    }

    throw new Error();
  }

  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();

    try {
      return await this.verify(request);
    } catch (e) {
      const message = e instanceof Error ? e.message : null;
      throw Exception.unauthorized("UNAUTHORIZED", message ?? "only allowed for not members.");
    }
  }
}

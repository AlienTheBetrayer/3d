import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { db } from "@repo/db";
import { eq } from "drizzle-orm";
import { Request } from "express";
import z from "zod";
import { DrizzleService } from "../../drizzle/drizzle.service.js";
import { VerifyService } from "../../verify/verify.service.js";
import { contracts } from "@repo/contracts";
import { RequestParser } from "../../../shared/index.js";
import { Exception } from "../../../shared/lib/exception.js";

@Injectable()
export class ConnectionLoginGuard implements CanActivate {
  constructor(
    private readonly drizzleService: DrizzleService,
    private readonly verifyService: VerifyService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();

    // parsing
    const parser = new RequestParser(request);
    const { connectionId, code } = parser.body({
      connectionId: z.nanoid(),
      code: contracts.connections.login.shape.code,
    });

    // getting the connection for metadata
    const connection = await this.drizzleService.db.query.connections.findFirst({
      where: eq(db.connections.id, connectionId),

      with: {
        connections_group: true,
        users: true,
      },
    });

    if (!connection) {
      throw Exception.notFound("FIELD_NOT_FOUND", "connection was not found in the database.");
    }

    // if it's an owner, try to verify the code
    if (connection.connections_group.owner_user_id === connection.user_id) {
      if (!code) {
        throw Exception.unauthorized("UNAUTHORIZED", "you cannot login as the owner of the group.");
      }

      try {
        await this.verifyService.validateCode({
          code,
          email: connection.users.email,
          type: "owner_connect",
        });
      } catch {
        throw Exception.unauthorized("UNAUTHORIZED", "owner connection code is invalid.");
      }
    }

    return true;
  }
}

import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { db } from "@repo/db";
import { eq } from "drizzle-orm";
import { Request } from "express";
import z from "zod";
import { DrizzleService } from "../../drizzle/drizzle.service.js";
import { RequestParser } from "../../../shared/index.js";
import { Exception } from "../../../shared/lib/exception.js";

@Injectable()
export class UserNotFoundGuard implements CanActivate {
  constructor(private readonly drizzleService: DrizzleService) {}

  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();

    // parsing
    const parser = new RequestParser(request);
    const { userId } = parser.body({ userId: z.nanoid() });

    // validating
    const found = await this.drizzleService.db.query.users.findFirst({
      where: eq(db.users.id, userId),
    });

    if (found) {
      throw Exception.conflict("USER_ALREADY_EXISTS", "user is already present.");
    }

    return true;
  }
}

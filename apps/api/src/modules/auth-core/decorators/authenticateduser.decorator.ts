import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { db } from "@repo/db";
import z from "zod";
import { RequestParser } from "../../../shared/index.js";

/**
 * schema representation of the authenticated user
 */
export const authenticatedUserSchema = db.usersSchema.extend({
  session: db.auth_sessionsSchema.extend({
    groups: db.connections_groupSchema.array().optional(),
  }),
});

/**
 * type
 */
export type AuthenticatedUserType = z.infer<typeof authenticatedUserSchema>;

/**
 * decorator for getting the authenticated user. (works only if auth guard is set)
 * @returns authenticated user object. null if not parsed. undefined if not found.
 */
export const AuthenticatedUser = createParamDecorator((body, ctx: ExecutionContext) => {
  try {
    // parsing
    const parser = new RequestParser(ctx.switchToHttp().getRequest());
    const user = parser.user();

    return user;
  } catch {
    return null;
  }
});

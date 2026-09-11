import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import z from "zod";
import { oAuthIdentitySchema } from "../oauth.types.js";

/**
 * decorator for getting the oauth identity
 */
export const OAuthIdentity = createParamDecorator(async (data, ctx: ExecutionContext) => {
  const request: Request = ctx.switchToHttp().getRequest();
  const parsed = await oAuthIdentitySchema.safeParseAsync(request.user);
  return parsed.data;
});

/**
 * oauth identity retrieved from services
 */
export type OAuthIdentityType = z.infer<typeof oAuthIdentitySchema> | undefined;

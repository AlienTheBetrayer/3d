import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";

/**
 * type
 */
export type AccessTokenType = string | undefined;

/**
 * decorator for getting the access token
 * @returns access token string or undefined
 */
export const AccessToken = createParamDecorator((data, ctx: ExecutionContext) => {
  const req: Request = ctx.switchToHttp().getRequest();
  return req.cookies["accessToken"] as AccessTokenType;
});

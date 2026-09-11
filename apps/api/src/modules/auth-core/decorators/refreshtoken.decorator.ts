import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";

/**
 * decorator for getting the refresh token
 * @returns refresh token string or undefined
 */
export const RefreshToken = createParamDecorator((data, ctx: ExecutionContext) => {
  const req: Request = ctx.switchToHttp().getRequest();
  return req.cookies["refreshToken"] as RefreshTokenType;
});

/**
 * type
 */
export type RefreshTokenType = string | undefined;

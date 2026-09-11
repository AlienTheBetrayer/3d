import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import jwt from "jsonwebtoken";
import { RefreshTokenType } from "./refreshtoken.decorator.js";

/**
 * decorator for getting the refresh token payload
 * @returns refresh token payload or null
 */
export const RefreshTokenPayload = createParamDecorator((data, ctx: ExecutionContext) => {
  const req: Request = ctx.switchToHttp().getRequest();
  const refreshToken = req.cookies["refreshToken"] as RefreshTokenType;

  if (!refreshToken) {
    return null;
  }

  try {
    const payload = jwt.verify(refreshToken, "REFRESH_TOKEN_SECRET");
    return payload;
  } catch {
    return null;
  }
});

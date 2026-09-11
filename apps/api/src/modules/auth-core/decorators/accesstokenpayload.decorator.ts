import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import jwt from "jsonwebtoken";
import { AccessTokenType } from "./accesstoken.decorator.js";

/**
 * decorator for getting the refresh token payload
 * @returns refresh token payload or null
 */
export const AccesshTokenPayload = createParamDecorator((data, ctx: ExecutionContext) => {
  const req: Request = ctx.switchToHttp().getRequest();
  const accessToken = req.cookies["accessToken"] as AccessTokenType;

  if (!accessToken) {
    return null;
  }

  try {
    const payload = jwt.verify(accessToken, "ACCESS_TOKEN_SECRET");
    return payload;
  } catch {
    return null;
  }
});

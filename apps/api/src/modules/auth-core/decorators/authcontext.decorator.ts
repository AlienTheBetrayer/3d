import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";

/**
 * decorator for getting the client ip and user agent
 * @returns ip and user agent
 */
export const AuthContext = createParamDecorator((data, ctx: ExecutionContext) => {
  const req: Request = ctx.switchToHttp().getRequest();

  return {
    ip: req.ip,
    userAgent: req.headers["user-agent"],
  } satisfies AuthContextType;
});

/**
 * type
 */
export type AuthContextType = {
  ip: string | undefined;
  userAgent: string | undefined;
};

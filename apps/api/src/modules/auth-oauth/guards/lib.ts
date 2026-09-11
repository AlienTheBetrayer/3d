import { ExecutionContext } from "@nestjs/common";
import { Request } from "express";

/**
 * shared getAuthenticateOptions to pass additional data through state
 * @param context execution context
 * @returns state object
 */
export const getAuthenticateOptions = async (context: ExecutionContext) => {
  const req: Request = context.switchToHttp().getRequest();

  return {
    state: JSON.stringify({
      action: req.query.action ?? "login",
      groupId: req.query.groupId || undefined,
    }),
  };
};

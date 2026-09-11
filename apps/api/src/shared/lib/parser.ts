import { Request } from "express";
import z from "zod";

import { authenticatedUserSchema } from "../../modules/auth-core/decorators/index.js";
import { oAuthIdentitySchema } from "../../modules/auth-oauth/oauth.types.js";
import { Exception } from "./exception.js";

export class RequestParser {
  constructor(private readonly request: Request) {}

  private parse<T extends z.ZodType>(schema: T, message: string, part: "user" | "body/query" = "user") {
    const result = schema.safeParse(
      part === "user"
        ? "user" in this.request
          ? this.request.user
          : null
        : {
            ...this.request.body,
            ...this.request.query,
            ...this.request.params,
          },
    );

    if (!result.success) {
      throw Exception.notFound("INVALID_REQUEST", message);
    }

    return result.data;
  }

  /**
   * parses a user (throws if wrong type)
   * @returns user or throws
   */
  user() {
    return this.parse(authenticatedUserSchema, "no user in the request. are guards set correctly?");
  }

  /**
   * parses an oAuth identity (throws if wrong type)
   * @returns oAuth identity or throws
   */
  identity() {
    return this.parse(oAuthIdentitySchema, "no identity in the request. are guards set correctly?");
  }

  /**
   * parses a custom body (throws if wrong type)
   * @returns custom body or throws
   */
  body<T extends z.ZodRawShape>(schema: T) {
    return this.parse(z.looseObject(schema), "request body is wrong type", "body/query");
  }
}

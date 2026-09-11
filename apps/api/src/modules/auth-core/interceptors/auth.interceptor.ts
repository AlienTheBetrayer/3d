import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request, Response } from "express";
import { map } from "rxjs/operators";
import { AppJwtService } from "../../jwt/jwt.service.js";
import { SKIP_AUTH_INTERCEPTOR_KEY } from "./auth.interceptor.metadata.js";
import { shared } from "@repo/contracts";

/**
 * interceptor to new attach token if refresh is valid ensuring seamless authentication. (no need to refresh on FE)
 * @returns request with a new safe access token
 */
@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(
    private readonly jwtService: AppJwtService,
    private readonly reflector: Reflector,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    const request: Request = context.switchToHttp().getRequest();
    const response: Response = context.switchToHttp().getResponse();

    // interceptor skipping logic
    const shouldSkip = this.reflector.get<boolean | undefined>(SKIP_AUTH_INTERCEPTOR_KEY, context.getHandler());

    if (shouldSkip) {
      return next.handle();
    }

    return next.handle().pipe(
      map((data: unknown) => {
        // getting tokens
        const { accessToken, refreshToken } = this.jwtService.getAuthTokens({
          request,
        });

        // refresh token not valid / absent - ignore
        if (!refreshToken) {
          return data;
        }

        let payload: shared.TokenPayload | null = null;
        try {
          payload = this.jwtService.verify({
            token: refreshToken,
            key: "REFRESH_TOKEN_SECRET",
          });
        } catch {
          return data;
        }

        // access token valid - ignore
        if (accessToken) {
          try {
            this.jwtService.verify({
              token: accessToken,
              key: "ACCESS_TOKEN_SECRET",
            });
            return data;
          } catch {
            /**/
          }
        }

        // intercepting
        this.jwtService.issueAuthTokens({ payload, request, response });
        return data;
      }),
    );
  }
}

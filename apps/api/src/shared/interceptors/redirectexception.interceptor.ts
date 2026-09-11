import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Response } from "express";
import { map } from "rxjs";

/**
 * redirects in case auth guard succeeded and has a metadata attached to it
 */
@Injectable()
export class RedirectExceptionInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(ctx: ExecutionContext, next: CallHandler) {
    const response: Response = ctx.switchToHttp().getResponse();

    // redirect
    const redirect = this.reflector.get<string | undefined>("authentication-success-redirect", ctx.getHandler());

    if (!redirect) {
      return next.handle();
    }

    return next.handle().pipe(
      map((data: unknown) => {
        if (!response.headersSent) {
          response.redirect(redirect);
        }

        return;
      }),
    );
  }
}

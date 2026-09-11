import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response } from "express";
import z from "zod";

@Catch(HttpException)
export class RedirectExceptionFilter implements ExceptionFilter {
  /**
   * parses the exception for the redirect availabiility
   * @param exception exception object
   * @returns redirect url or undefined if not found
   */
  private parse(exception: string | object) {
    // type
    if (typeof exception !== "object") {
      return;
    }

    // schema
    const exceptionParsed = z.safeParse(
      z.looseObject({
        redirectURL: z.url(),
      }),
      exception,
    );

    if (!exceptionParsed.success) {
      return;
    }

    return exceptionParsed.data;
  }

  catch(exception: HttpException, host: ArgumentsHost) {
    const response: Response = host.switchToHttp().getResponse();
    const exceptionResponse = exception.getResponse();

    // parsing
    const parsed = this.parse(exceptionResponse);

    if (parsed) {
      // redirect
      response.redirect(parsed.redirectURL);
    } else {
      // regular format
      return response.status(exception.getStatus()).json(exceptionResponse);
    }
  }
}

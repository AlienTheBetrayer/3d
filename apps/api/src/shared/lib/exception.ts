import { HttpException, HttpStatus } from "@nestjs/common";

/**
 * all exception codes
 */
export const ExceptionCodes = [
  "INVALID_CREDENTIALS",
  "EMAIL_NOT_FOUND",
  "UNAUTHORIZED",
  "ALREADY_AUTHORIZED",
  "FORBIDDEN",
  "SESSION_EXPIRED",
  "SESSION_REVOKED",
  "INVALID_TOKEN",
  "FIELD_NOT_FOUND",

  "INVALID_VERIFICATION_CODE",
  "VERIFICATION_CODE_EXPIRED",
  "TOO_MANY_VERIFICATION_ATTEMPTS",

  "USER_NOT_FOUND",
  "USER_ALREADY_EXISTS",
  "NOT_FOUND",

  "OAUTH_FAILED",
  "OAUTH_ACCOUNT_ALREADY_LINKED",

  "VALIDATION_ERROR",
  "INVALID_REQUEST",

  "RATE_LIMITED",
  "SERVICE_UNAVAILABLE",
  "INTERNAL_ERROR",
] as const;

export type ExceptionCode = (typeof ExceptionCodes)[number];

/**
 * exception class to handle errors
 */
export class Exception extends HttpException {
  constructor(statusCode: HttpStatus, code: ExceptionCode, message: string, meta?: Record<string, unknown>) {
    super({ statusCode, code, message, meta }, statusCode);
  }

  static badRequest(code: ExceptionCode, message: string, meta?: Record<string, unknown>) {
    return new Exception(HttpStatus.BAD_REQUEST, code, message, meta);
  }

  static unauthorized(code: ExceptionCode, message: string, meta?: Record<string, unknown>) {
    return new Exception(HttpStatus.UNAUTHORIZED, code, message, meta);
  }

  static forbidden(code: ExceptionCode, message: string, meta?: Record<string, unknown>) {
    return new Exception(HttpStatus.FORBIDDEN, code, message, meta);
  }

  static notFound(code: ExceptionCode, message: string, meta?: Record<string, unknown>) {
    return new Exception(HttpStatus.NOT_FOUND, code, message, meta);
  }

  static methodNotAllowed(code: ExceptionCode, message: string, meta?: Record<string, unknown>) {
    return new Exception(HttpStatus.METHOD_NOT_ALLOWED, code, message, meta);
  }

  static conflict(code: ExceptionCode, message: string, meta?: Record<string, unknown>) {
    return new Exception(HttpStatus.CONFLICT, code, message, meta);
  }

  static unprocessableEntity(code: ExceptionCode, message: string, meta?: Record<string, unknown>) {
    return new Exception(HttpStatus.UNPROCESSABLE_ENTITY, code, message, meta);
  }

  static tooManyRequests(code: ExceptionCode, message: string, meta?: Record<string, unknown>) {
    return new Exception(HttpStatus.TOO_MANY_REQUESTS, code, message, meta);
  }

  static internalServerError(code: ExceptionCode, message: string, meta?: Record<string, unknown>) {
    return new Exception(HttpStatus.INTERNAL_SERVER_ERROR, code, message, meta);
  }

  static notImplemented(code: ExceptionCode, message: string, meta?: Record<string, unknown>) {
    return new Exception(HttpStatus.NOT_IMPLEMENTED, code, message, meta);
  }

  static serviceUnavailable(code: ExceptionCode, message: string, meta?: Record<string, unknown>) {
    return new Exception(HttpStatus.SERVICE_UNAVAILABLE, code, message, meta);
  }
}

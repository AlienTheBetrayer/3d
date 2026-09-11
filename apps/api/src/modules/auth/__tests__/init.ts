import { Mock } from "vitest";
import { AuthService } from "../auth.service.js";

type InitMocks = {
  authService: AuthService;
  verifyService: {
    validateCode: Mock;
    issueCode: Mock;
  };
  db: {
    authSessions: {
      count: Mock;
      delete: Mock;
    };
    update: Mock;
    count: Mock;
    select: Mock;
  };
  jwtService: {
    issueAuthData: Mock;
    getAuthTokens: Mock;
    verify: Mock;
    deleteAuthTokens: Mock;
  };
  userService: {
    create: Mock;
  };
};

export const init = (): InitMocks => {
  const db = {
    authSessions: {
      count: vi.fn(),
      delete: vi.fn(),
    },
    update: vi.fn(),
    count: vi.fn(),
    select: vi.fn(),
  };

  const verifyService = {
    validateCode: vi.fn(),
    issueCode: vi.fn(),
  };

  const jwtService = {
    issueAuthData: vi.fn(),
    getAuthTokens: vi.fn(),
    verify: vi.fn(),
    deleteAuthTokens: vi.fn(),
  };

  const userService = {
    create: vi.fn(),
  };

  const authService = new AuthService(db as never, verifyService as never, jwtService as never, userService as never);
  return { authService, verifyService, db, jwtService, userService };
};

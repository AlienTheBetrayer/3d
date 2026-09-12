import { Mock } from "vitest";
import { AuthCoreService } from "../auth.service.js";

type InitMocks = {
  authCoreService: AuthCoreService;

  db: {
    authSessions: {
      findFirst: Mock;
    };
    query: {
      auth_sessions: {
        findFirst: Mock;
      };
    };
  };

  jwtService: {
    verify: Mock;
  };
};

export const init = (): InitMocks => {
  const authSessions = {
    findFirst: vi.fn(),
  };

  const db = {
    authSessions,
    query: {
      auth_sessions: authSessions,
    },
  };

  const jwtService = {
    verify: vi.fn(),
  };

  const authCoreService = new AuthCoreService({ db } as never, jwtService as never);

  return {
    authCoreService,
    db,
    jwtService,
  };
};

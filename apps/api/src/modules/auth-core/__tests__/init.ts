import { Mock } from "vitest";
import { AuthCoreService } from "../auth.service.js";

type InitMocks = {
  authCoreService: AuthCoreService;

  db: {
    authSessions: {
      findFirst: Mock;
    };
  };

  jwtService: {
    verify: Mock;
  };
};

export const init = (): InitMocks => {
  const db = {
    authSessions: {
      findFirst: vi.fn(),
    },
  };

  const jwtService = {
    verify: vi.fn(),
  };

  const authCoreService = new AuthCoreService(db as never, jwtService as never);

  return {
    authCoreService,
    db,
    jwtService,
  };
};

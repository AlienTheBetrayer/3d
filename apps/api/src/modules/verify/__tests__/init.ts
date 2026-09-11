import { Mock } from "vitest";
import { VerifyService } from "../verify.service.js";

type InitMocks = {
  verifyService: VerifyService;

  db: {
    verificationCodes: {
      deleteMany: Mock;
      findFirst: Mock;
      count: Mock;
      create: Mock;
    };
  };

  mailService: {
    send: Mock;
  };
};

export const init = (): InitMocks => {
  const db = {
    verificationCodes: {
      deleteMany: vi.fn(),
      findFirst: vi.fn(),
      count: vi.fn(),
      create: vi.fn(),
    },
  };

  const mailService = {
    send: vi.fn(),
  };

  const verifyService = new VerifyService(db as never, mailService as never);

  return {
    verifyService,
    db,
    mailService,
  };
};

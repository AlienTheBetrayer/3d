import { Mock } from 'vitest';
import { VerifyService } from '../verify.service.js';

type InitMocks = {
  verifyService: VerifyService;

  db: {
    verificationCodes: {
      deleteMany: Mock;
      findFirst: Mock;
      count: Mock;
      create: Mock;
    };
    query: {
      verification_codes: {
        findFirst: Mock;
      };
    };
    insert: Mock;
    insertResult: Mock;
    deleteResult: Mock;
  };

  mailService: {
    send: Mock;
  };
};

export const init = (): InitMocks => {
  const insertResult = vi.fn().mockResolvedValue([]);
  const deleteResult = vi.fn().mockResolvedValue([{}]);

  const db = {
    verificationCodes: {
      deleteMany: vi.fn(),
      findFirst: vi.fn(),
      count: vi.fn(),
      create: vi.fn(),
    },
    query: {
      verification_codes: {
        findFirst: vi.fn(),
      },
    },
    insert: vi.fn(() => ({
      values: vi.fn(() => ({ returning: insertResult })),
    })),
    insertResult,
    delete: vi.fn(() => ({
      where: vi.fn(() => ({ returning: deleteResult })),
    })),
    deleteResult,
  };

  const mailService = {
    send: vi.fn(),
  };

  db.query.verification_codes.findFirst = db.verificationCodes.findFirst;

  const verifyService = new VerifyService({ db } as never, mailService as never);

  return {
    verifyService,
    db,
    mailService,
  };
};

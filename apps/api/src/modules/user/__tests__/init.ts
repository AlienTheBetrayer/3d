import { Mock } from "vitest";
import { UserService } from "../user.service.js";

type InitMocks = {
  userService: UserService;

  db: {
    users: {
      count: Mock;
      findFirst: Mock;
      findMany: Mock;
      update: Mock;
      create: Mock;
    };
    query: {
      users: {
        findFirst: Mock;
        findMany: Mock;
      };
    };
    insert: Mock;
  };
};

export const init = (): InitMocks => {
  const db = {
    users: {
      count: vi.fn(),
      findFirst: vi.fn(),
      findMany: vi.fn(),
      update: vi.fn(),
      create: vi.fn(),
    },
    query: {
      users: {
        findFirst: vi.fn(),
        findMany: vi.fn(),
      },
    },
    insert: vi.fn(() => ({
      values: vi.fn(() => ({ returning: vi.fn().mockResolvedValue([{}]) })),
    })),
  };

  db.query.users.findFirst = db.users.findFirst;
  db.query.users.findMany = db.users.findMany;

  const userService = new UserService({ db } as never);

  return {
    userService,
    db,
  };
};

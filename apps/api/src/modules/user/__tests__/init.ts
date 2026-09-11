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
  };

  const userService = new UserService(db as never);

  return {
    userService,
    db,
  };
};

import { contracts } from "@repo/contracts";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { init } from "./init.js";

vi.mock("@dicebear/core", () => ({
  Avatar: class {
    toDataUri() {}
  },
  Style: class {},
}));

describe("UserService", () => {
  const { userService, db } = init();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const dto: contracts.user.Create = {
    email: "email",
    password: "password",
  };

  describe("happy path", () => {
    it("should create the user if the email is not taken", async () => {
      // arrange
      db.users.count.mockResolvedValue(0);

      // act
      const result = await userService.create(dto);

      // assert
      expect(result).not.toBeNull();
      expect(db.users.create).toHaveBeenCalled();
    });
  });

  describe("sad path", () => {
    it("should throw if the email is taken", async () => {
      // arrange
      db.users.count.mockResolvedValue(1);

      // act
      const result = userService.create(dto);

      // assert
      await expect(result).rejects.toThrow();
      expect(db.users.create).not.toHaveBeenCalled();
    });
  });
});

import { beforeEach, describe, expect, it, vi } from "vitest";
import { init } from "./init.js";

describe("AuthService", () => {
  const { authService, verifyService, userService } = init();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("happy paths", () => {
    it("should sign up if the code is valid", async () => {
      // arrange
      const dto = {
        email: "email",
        password: "password",
        code: "code",
      };

      verifyService.validateCode.mockResolvedValue({} as never);

      // act
      await authService.signup(dto);

      // assert
      expect(userService.create).toHaveBeenCalled();
    });
  });

  describe("sad paths", () => {
    it("should throw when attempting to sign up with an invalid code", async () => {
      // arrange
      const dto = {
        email: "email",
        password: "password",
        code: "code",
      };

      const error = new Error();
      verifyService.validateCode.mockRejectedValue(error);

      // act
      const result = authService.signup(dto);

      // assert
      await expect(result).rejects.toThrow(error);
      expect(userService.create).not.toHaveBeenCalled();
    });
  });
});

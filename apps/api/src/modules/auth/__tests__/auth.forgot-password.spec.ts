import bcrypt from "bcryptjs";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { init } from "./init.js";

describe("AuthService", () => {
  // setup
  const { authService, verifyService, db } = init();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("forgotPassword", () => {
    it("changes the password when the code is valid", async () => {
      verifyService.validateCode.mockResolvedValue(undefined);

      vi.spyOn(bcrypt, "hash").mockResolvedValue("hashed-password" as never);

      const dto = {
        email: "email",
        password: "password",
        code: "code",
      };

      await authService.forgotPassword(dto);

      expect(verifyService.validateCode).toHaveBeenCalledWith(dto.email, dto.code);
    });

    it("does not change the password when the code is invalid", async () => {
      const error = new Error("Invalid code");

      verifyService.validateCode.mockRejectedValue(error);

      const dto = {
        email: "email",
        password: "password",
        code: "code",
      };

      await expect(authService.forgotPassword(dto)).rejects.toThrow(error);

      expect(db.update).not.toHaveBeenCalled();
    });
  });
});

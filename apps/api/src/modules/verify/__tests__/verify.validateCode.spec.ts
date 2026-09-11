import { VerifyService } from "../verify.service.js";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { init } from "./init.js";

describe("VerifyService", () => {
  const { verifyService, db } = init();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("happy paths", () => {
    it("should validate the code if it found the right one", async () => {
      // arrange
      const dto: Parameters<VerifyService["validateCode"]>[0] = {
        email: "m@email.com",
        code: "23423423",
        type: "signup",
      };

      db.verificationCodes.findFirst.mockResolvedValue({});

      // act
      const result = await verifyService.validateCode(dto);

      // assert
      expect(result).toBeDefined();
    });
  });

  describe("sad paths", () => {
    it("should throw while validating the code if it hasn't found it", async () => {
      // arrange
      const dto: Parameters<VerifyService["validateCode"]>[0] = {
        email: "m@email.com",
        code: "23423423",
        type: "signup",
      };

      db.verificationCodes.findFirst.mockResolvedValue(null);

      // act
      const result = verifyService.validateCode(dto);

      // assert
      await expect(result).rejects.toThrow();
    });
  });
});

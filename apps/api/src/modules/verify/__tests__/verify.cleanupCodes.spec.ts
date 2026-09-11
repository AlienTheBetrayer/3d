import { beforeEach, describe, expect, it, vi } from "vitest";
import { init } from "./init.js";

describe("VerifyService", () => {
  const { verifyService, db } = init();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("happy paths", () => {
    it("should return codes if found", async () => {
      // arrange
      const dto = {
        email: "email@gmail.com",
      };

      db.verificationCodes.count.mockResolvedValue(1);

      // act
      const result = await verifyService.cleanupCodes(dto);

      // assert
      expect(result).not.toBeNull();
    });
  });

  describe("sad paths", () => {
    it("should return null if no codes are found", async () => {
      // arrange
      const dto = {
        email: "email@gmail.com",
      };

      db.verificationCodes.count.mockResolvedValue(0);

      // act
      const result = await verifyService.cleanupCodes(dto);

      // assert
      expect(result).toBeNull();
      expect(db.verificationCodes.deleteMany).not.toHaveBeenCalled();
    });
  });
});

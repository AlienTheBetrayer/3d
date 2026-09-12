import { beforeEach, describe, expect, it, vi } from "vitest";
import { init } from "./init.js";

describe("AuthService", () => {
  // setup
  const { authService, db, jwtService } = init();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("happy paths", () => {
    it("should successfully log the user out if session is found and refresh token is valid and decoded", async () => {
      // arrange
      const session = {
        id: "session-123",
      };

      jwtService.getAuthTokens.mockReturnValue({
        accessToken: "access",
        refreshToken: "refresh",
      });

      jwtService.verify.mockReturnValue({
        sessionId: session.id,
      });

      db.authSessions.count.mockResolvedValue(1);

      // act
      await authService.logout(session.id);

      // assert
      expect(db.delete).toHaveBeenCalled();
    });
  });

  describe("sad paths", () => {
    it("should not log the user out if session is not found", async () => {
      // arrange
      db.authSessions.count.mockResolvedValue(0);

      // act
      const result = authService.logout("session-id");

      // assert
      expect(db.authSessions.delete).not.toHaveBeenCalled();
      await expect(result).rejects.toThrow();
    });
  });
});

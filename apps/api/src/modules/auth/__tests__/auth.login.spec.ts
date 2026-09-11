import bcrypt from "bcryptjs";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AuthContextType } from "../../auth-core/decorators/authcontext.decorator.js";
import { init } from "./init.js";

vi.mock("bcryptjs", () => ({
  default: {
    compare: vi.fn(),
  },
}));

describe("AuthService", () => {
  // setup
  const { authService, verifyService, db, jwtService } = init();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // init variables
  const dto = {
    email: "email",
    password: "password",
    code: "code",
  };

  const authCtx: AuthContextType = {
    ip: "ip",
    userAgent: "userAgent",
  };

  const user = {
    id: "user-id",
    password: "password",
  };

  const ret = {
    accessToken: "a",
    refreshToken: "r",
    session: {},
  };

  describe("happy paths", () => {
    it("should login if the code and password are valid", async () => {
      // arrange
      verifyService.validateCode.mockResolvedValue({});
      db.select.mockResolvedValue(user);
      jwtService.issueAuthData.mockResolvedValue(ret);
      vi.mocked(bcrypt.compare).mockResolvedValue(true as never);

      // act
      const result = await authService.login(dto, authCtx);

      // assert
      expect(result).toBeDefined();
      expect(jwtService.issueAuthData).toHaveBeenCalled();
    });
  });

  describe("sad paths", () => {
    it("should throw when attempting to login with an invalid password", async () => {
      // arrange
      db.select.mockResolvedValue(undefined);
      verifyService.validateCode.mockResolvedValue(undefined);
      jwtService.issueAuthData.mockResolvedValue(ret);
      vi.mocked(bcrypt.compare).mockResolvedValue(false as never);

      // act
      const result = authService.login(dto, authCtx);

      // assert
      await expect(result).rejects.toThrow();
      expect(jwtService.issueAuthData).not.toHaveBeenCalled();
    });

    it("should throw when attempting to login with an invalid email", async () => {
      // arrange
      db.select.mockResolvedValue(null);
      verifyService.validateCode.mockResolvedValue(undefined);
      jwtService.issueAuthData.mockResolvedValue(ret);

      // act
      const result = authService.login(dto, authCtx);

      // assert
      await expect(result).rejects.toThrow();
      expect(jwtService.issueAuthData).not.toHaveBeenCalled();
    });

    it("should throw when attempting to login with an invalid code", async () => {
      // arrange
      const error = new Error();

      verifyService.validateCode.mockRejectedValue(error);
      vi.mocked(bcrypt.compare);

      // act
      const result = authService.login(dto, authCtx);

      // assert
      await expect(result).rejects.toThrow(error);
      expect(bcrypt.compare).not.toHaveBeenCalled();
      expect(jwtService.issueAuthData).not.toHaveBeenCalled();
    });
  });
});

import bcrypt from 'bcryptjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { init } from './init.js';

vi.mock('bcryptjs', () => ({
  default: {
    compare: vi.fn(),
  },
}));

describe('AuthCoreService', () => {
  const { authCoreService, db, jwtService } = init();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const request = {
    cookies: {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    },
  };

  describe('happy paths', () => {
    it('should verify the code if refresh token is found, jwt service validated, auth session found and hash validated', async () => {
      // arrange
      jwtService.verify.mockResolvedValue({} as never);
      db.authSessions.findFirst.mockResolvedValue({});
      vi.mocked(bcrypt.compare).mockResolvedValue(true as never);

      // act
      const result = await authCoreService.verify(request as never);

      // assert
      expect(result).toBe(true);
    });
  });

  describe('sad paths', () => {
    it('should throw if jwt token is not verified', async () => {
      // arrange
      jwtService.verify.mockImplementation(() => {
        throw new Error();
      });

      // act
      const result = authCoreService.verify(request as never);

      // assert
      await expect(result).rejects.toThrow();
      expect(db.authSessions.findFirst).not.toHaveBeenCalled();
      expect(bcrypt.compare).not.toHaveBeenCalled();
    });

    it('should throw if auth session is not found', async () => {
      // arrange
      jwtService.verify.mockReturnValue({
        sessionId: 'sessionId',
        userId: 'userId',
      });
      db.authSessions.findFirst.mockResolvedValue(null);

      // act
      const result = authCoreService.verify(request as never);

      // assert
      await expect(result).rejects.toThrow();
      expect(bcrypt.compare).not.toHaveBeenCalled();
    });

    it('should throw if hash does not match', async () => {
      // arrange
      jwtService.verify.mockImplementation(({ key }) => {
        if (key === 'ACCESS_TOKEN_SECRET') {
          throw new Error();
        }

        return {
          sessionId: 'sessionId',
          userId: 'userId',
        };
      });
      db.authSessions.findFirst.mockResolvedValue({});
      vi.mocked(bcrypt.compare).mockResolvedValue(false as never);

      // act
      const result = authCoreService.verify(request as never);

      // assert
      await expect(result).rejects.toThrow();
    });
  });
});

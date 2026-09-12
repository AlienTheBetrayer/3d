import { contracts } from '@repo/contracts';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { init } from './init.js';

vi.mock('@dicebear/core', () => ({
  Avatar: class {
    toDataUri() {}
  },
  Style: class {},
}));

describe('UserService', () => {
  const { userService, db } = init();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const dto: contracts.user.Create = {
    email: 'email',
    password: 'password',
  };

  describe('happy path', () => {
    it('should create the user if the email is not taken', async () => {
      // arrange
      db.users.findFirst.mockResolvedValue(null);

      // act
      const result = await userService.create(dto);

      // assert
      expect(result).not.toBeNull();
      expect(db.insert).toHaveBeenCalled();
    });
  });

  describe('sad path', () => {
    it('should throw if the email is taken', async () => {
      // arrange
      db.users.findFirst.mockResolvedValue({});

      // act
      const result = userService.create(dto);

      // assert
      await expect(result).rejects.toThrow();
      expect(db.insert).not.toHaveBeenCalled();
    });
  });
});

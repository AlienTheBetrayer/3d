import { beforeEach, describe, expect, it, vi } from 'vitest';
import { init } from './init.js';

describe('UserService', () => {
  const { userService, db } = init();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // arrange vars
  const dto = 'm@gmail.com';

  describe('happy paths', () => {
    it("should generate a username and not search for more if it doesn't exist", async () => {
      // arrange
      db.users.findFirst.mockResolvedValue(null);

      // act
      await userService.generateUsername(dto);

      // assert
      expect(db.users.findMany).not.toHaveBeenCalled();
    });
  });

  describe('sad paths', () => {
    it('should start searching for all usernames if it exists', async () => {
      // arrange
      db.users.findFirst.mockResolvedValue({ username: 'username' });
      db.users.findMany.mockResolvedValue([{ username: 'username' }]);

      // act
      await userService.generateUsername(dto);

      // assert
      expect(db.users.findMany).toHaveBeenCalled();
    });
  });
});

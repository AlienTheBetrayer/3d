import { contracts } from '@repo/contracts';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { init } from './init.js';

describe('VerifyService', () => {
  const { verifyService, db } = init();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('happy paths', () => {
    it("should return and send the code if it's been issued", async () => {
      // arrange
      const dto: contracts.auth.Code = {
        email: 'email',
        type: 'signup',
      };

      db.insertResult.mockResolvedValue([
        {
          id: 'code-123',
          code: '123456',
        },
      ]);

      // act
      const result = await verifyService.issueCode(dto);

      // assert
      expect(result).not.toBeNull();
      expect(db.insert).toHaveBeenCalled();
    });
  });
});

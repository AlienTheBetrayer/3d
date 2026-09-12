import { contracts } from '@repo/contracts';
import { init } from './init.js';

/**
 * testing
 */
describe('AuthService', () => {
  // setup
  const { authService, verifyService, db } = init();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('happy paths', () => {
    for (const [type, count] of new Map<contracts.auth.Code['type'], 0 | 1>([
      ['signup', 0],
      ['login', 1],
      ['forgot_password', 1],
    ])) {
      it(`should issue a code for ${type} if user does ${count ? '' : 'not'} exist`, async () => {
        // arrange
        const dto: contracts.auth.Code = {
          email: 'email',
          type,
        };
        db.selectResult.mockResolvedValue(count ? [{}] : []);

        // act
        await authService.code(dto);

        // assert
        expect(verifyService.issueCode).toHaveBeenCalled();
      });
    }
  });

  describe('sad paths', () => {
    for (const [type, count] of new Map<contracts.auth.Code['type'], 0 | 1>([
      ['signup', 1],
      ['login', 0],
      ['forgot_password', 0],
    ])) {
      it(`should not issue a code for ${type} if user does ${count ? '' : 'not'} exist`, async () => {
        // arrange
        const dto: contracts.auth.Code = {
          email: 'email',
          type,
        };
        db.selectResult.mockResolvedValue(count ? [{}] : []);

        // act
        const result = authService.code(dto);

        // assert
        await expect(result).rejects.toThrow();
        expect(verifyService.issueCode).not.toHaveBeenCalled();
      });
    }
  });
});

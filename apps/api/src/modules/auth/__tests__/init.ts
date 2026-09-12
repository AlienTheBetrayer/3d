import { Mock } from 'vitest';
import { AuthService } from '../auth.service.js';

type InitMocks = {
  authService: AuthService;
  verifyService: {
    validateCode: Mock;
    issueCode: Mock;
  };
  db: {
    authSessions: {
      count: Mock;
      delete: Mock;
    };
    update: Mock;
    delete: Mock;
    count: Mock;
    select: Mock;
    selectResult: Mock;
    updateResult: Mock;
    deleteResult: Mock;
    query: {
      users: { findFirst: Mock };
      auth_sessions: { findFirst: Mock };
    };
  };
  jwtService: {
    issueAuthData: Mock;
    getAuthTokens: Mock;
    verify: Mock;
    deleteAuthTokens: Mock;
  };
  userService: {
    create: Mock;
  };
};

export const init = (): InitMocks => {
  const selectResult = vi.fn().mockResolvedValue([]);
  const updateResult = vi.fn().mockResolvedValue([{}]);
  const deleteResult = vi.fn().mockResolvedValue([{}]);

  const db = {
    authSessions: {
      count: vi.fn(),
      delete: vi.fn(),
    },
    update: vi.fn(() => ({
      set: vi.fn(() => ({
        where: vi.fn(() => ({ returning: updateResult })),
      })),
    })),
    count: vi.fn(),
    select: vi.fn(() => ({
      from: vi.fn(() => ({ where: selectResult })),
    })),
    selectResult,
    updateResult,
    deleteResult,
    delete: vi.fn(() => ({
      where: vi.fn(() => ({ returning: deleteResult })),
    })),
    query: {
      users: { findFirst: vi.fn() },
      auth_sessions: { findFirst: vi.fn() },
    },
  };

  const verifyService = {
    validateCode: vi.fn(),
    issueCode: vi.fn(),
  };

  const jwtService = {
    issueAuthData: vi.fn(),
    getAuthTokens: vi.fn(),
    verify: vi.fn(),
    deleteAuthTokens: vi.fn(),
  };

  const userService = {
    create: vi.fn(),
  };

  db.query.users.findFirst = vi.fn();
  db.query.auth_sessions.findFirst = db.authSessions.count;

  const authService = new AuthService(
    { db } as never,
    verifyService as never,
    jwtService as never,
    userService as never,
  );
  return { authService, verifyService, db, jwtService, userService };
};

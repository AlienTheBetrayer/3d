export const password = {
  length: {
    min: 8,
    max: 128,
  },
};
export const code = { expiryMs: 5 * 60 * 1000, length: 6 };

/**
 * jwt-related
 */
export const accessToken = { expiryMs: 15 * 60 * 1000 };
export const refreshToken = { expiryMs: 30 * 24 * 60 * 60 * 1000 };

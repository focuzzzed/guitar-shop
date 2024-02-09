export const SALT_ROUNDS = 10;

export const USER_AVAILABLE_VALUE = {
  NAME: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 15,
  },
  PASSWORD: {
    MIN_LENGTH: 6,
    MAX_LENGTH: 12,
  },
} as const;
export const PRODUCT_AVAILABLE_VALUE = {
  TITLE: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 100,
  },
  DESCRIPTION: {
    MIN_LENGTH: 20,
    MAX_LENGTH: 1024,
  },
  ARTICLE: {
    MIN_LENGTH: 5,
    MAX_LENGTH: 40,
  },
  STRINGS_COUNT: [4, 6, 7, 12],
  PRICE: {
    MINIMUM: 100,
    MAXIMUM: 1000000,
  }
} as const;
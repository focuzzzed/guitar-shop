import { PRODUCT_AVAILABLE_VALUE } from './product.const';
import { GuitarTypes } from '../../../types';

export const PRODUCT_VALIDATION_MESSAGE = {
  TITLE: {
    MIN_LENGTH: 'Minimum title length is 10 chars',
    MAX_LENGTH: 'Maximum title length is 100 chars',
    REQUIRED: 'Title is required',
  },
  DESCRIPTION: {
    MIN_LENGTH: 'Minimum description length is 20 chars',
    MAX_LENGTH: 'Maximum description length is 1024 chars',
    REQUIRED: 'Description is required',
  },
  ADDITION_DATE: {
    NOT_VALID: 'The date of addition must be valid in ISO8601 format'
  },
  PHOTO_URL: {
    REQUIRED: 'The product is required to have a path to the photo'
  },
  ARTICLE: {
    MIN_LENGTH: 'Minimum article length is 5 chars',
    MAX_LENGTH: 'Maximum article length is 40 chars',
    REQUIRED: 'Article is required',
  },
  STRINGS_COUNT: {
    NOT_VALID: `Available number of strings: ${Object.values(PRODUCT_AVAILABLE_VALUE.STRINGS_COUNT)}`,
    TYPE_NOT_VALID: `The count of strings should be a number`,
    REQUIRED: 'Strings count is required',
  },
  GUITAR_TYPE: {
    NOT_VALID: `Available types of guitar: ${Object.values(GuitarTypes)}`,
    REQUIRED: 'Guitar type is required',
  },
  PRICE: {
    MINIMUM: 'Minimum price is 100',
    MAXIMUM: 'Maximum price is 1000000',
    REQUIRED: 'Price is required',
    NOT_VALID: 'Price must be a number',
  }
} as const;
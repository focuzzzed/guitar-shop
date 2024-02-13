import { ClassConstructor, plainToInstance } from 'class-transformer';
import { GuitarTypes, Product } from '../types';
import { faker } from '@faker-js/faker';
import { PRODUCT_AVAILABLE_VALUE } from '../modules/products/product';

export function fillDTO<T, V>(someDTO: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDTO, plainObject, { excludeExtraneousValues: true });
}

export function getFileExtension(filename: string) {
  const extensionStartIndex = filename.lastIndexOf('.');
  return filename.slice(extensionStartIndex + 1);
}

export function generateProducts(count: number) {
  const generatedProducts: Product[] = [];
  const MOCK_GUITAR_FILENAME = 'mock-guitar.png';
  for(let i = 0; i < count; i++) {
    const product: Product = {
      title: `${faker.commerce.productAdjective()} guitar`,
      description: faker.commerce.productDescription(),
      additionDate: new Date(),
      photoUrl: MOCK_GUITAR_FILENAME,
      guitarType: faker.helpers.enumValue(GuitarTypes),
      article: faker.commerce.isbn(10),
      stringsCount: faker.helpers.arrayElement(PRODUCT_AVAILABLE_VALUE.STRINGS_COUNT),
      price: Number(faker.commerce.price({
        min: PRODUCT_AVAILABLE_VALUE.PRICE.MINIMUM,
        max: PRODUCT_AVAILABLE_VALUE.PRICE.MAXIMUM,
      }))
    };
    generatedProducts.push(product);
  }

  return generatedProducts;
}
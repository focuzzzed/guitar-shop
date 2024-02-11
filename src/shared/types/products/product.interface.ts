import { GuitarTypes } from './guitar-type.enum';
import { GuitarStringsCount } from './guitar-strings-count.type';

export interface Product {
  id?: string;
  title: string;
  description: string;
  additionDate?: Date;
  updatedAt?: Date;
  photoUrl: string;
  guitarType: GuitarTypes;
  article: string;
  stringsCount: number;
  price: GuitarStringsCount;
}
import { GuitarTypes } from './guitar-type.enum';
import { GuitarStringsCount } from './guitar-strings-count.type';

export interface Product {
  id?: string;
  title: string;
  description: string;
  additionDate?: Date;
  photoUrl: string;
  guitarType: GuitarTypes;
  article: string;
  stringsCount: GuitarStringsCount;
  price: number;
}
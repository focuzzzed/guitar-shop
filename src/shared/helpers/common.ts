import { ClassConstructor, plainToInstance } from 'class-transformer';

export function fillDTO<T, V>(someDTO: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDTO, plainObject, { excludeExtraneousValues: true });
}

export function getFileExtension(filename: string) {
  const extensionStartIndex = filename.lastIndexOf('.');
  return filename.slice(extensionStartIndex + 1);
}
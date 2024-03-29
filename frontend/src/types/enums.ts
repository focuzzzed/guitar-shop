export const SocialNetworks = ['skype', 'vsco', 'pinterest'];
export const FooterLinks = ['Где купить?', 'Блог', 'Вопрос - ответ', 'Возврат', 'Сервис-центры'];

export enum AuthorizationStatus {
  Auth = 'authorized',
  NoAuth = 'non-authorized',
  Unknown = 'unknown',
}

export enum NameSpace {
  User = 'USER',
  Products = 'PRODUCT',
  Pagination = 'PAGINATION',
}
export enum GuitarTypes {
  Electro = 'электро',
  Acoustic = 'акустика',
  Ukulele = 'укулеле',
}

export enum GuitarStringsCount{
  FourString = 4,
  SixString = 6,
  SevenString = 7,
  TwelveString = 12,
}

export enum CrumbName{
  Login = 'Вход',
  Create = 'Новый товар',
  Products = 'Товары',
  Product = 'Товар',
}

export enum SortDirection {
  Ascending = 'asc',
  Descending = 'desc',
}

export enum SortField {
  ByAdditionDate = 'additionDate',
  ByPrice = 'price'
}

export enum ProductTab {
  Description = 'descriprion',
  Characteristics = 'characteristics'
}

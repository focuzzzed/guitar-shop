import { Product, Entity, EntityIdType, GuitarTypes, GuitarStringsCount } from '../../types';

export class ProductEntity implements Product, Entity<EntityIdType> {
  public id?: string;
  public title: string;
  public description: string;
  public additionDate?: Date;
  public updatedAt?: Date;
  public photoUrl: string;
  public guitarType: GuitarTypes;
  public article: string;
  public stringsCount: GuitarStringsCount;
  public price: number;

  public populate(data: Product) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.additionDate = data.additionDate;
    this.updatedAt = data.updatedAt;
    this.photoUrl = data.photoUrl;
    this.guitarType = data.guitarType;
    this.article = data.article;
    this.stringsCount = data.stringsCount;
    this.price = data.price;

    return this;
  }

  public serialize(){
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      additionDate: this.additionDate,
      updatedAt: this.updatedAt,
      photoUrl: this.photoUrl,
      guitarType: this.guitarType,
      article: this.article,
      stringsCount: this.stringsCount,
      price: this.price,
    }
  }

  static fromObject(data: Product): ProductEntity {
    return new ProductEntity()
      .populate(data);
  }
}
import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductQuery } from '../query/product.query';
import { PaginationResult } from '../../../types';
import { ProductRepository } from './product.repository';
import { ProductEntity } from './product.entity';
import { CreateProductDTO } from '../dto/create-product.dto';
import { UpdateProductDTO } from '../dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
  ) { }

  public async getAllProducts(query?: ProductQuery): Promise<PaginationResult<ProductEntity>> {
    return this.productRepository.find(query);
  }

  public async getProductById(id: string): Promise<ProductEntity> {
    try{
      return this.productRepository.getById(id);
    } catch {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
  }

  public async updateProduct(id: string, dto: UpdateProductDTO): Promise<ProductEntity> {
    try{
      return await this.productRepository.update(id, dto);
    } catch {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
  }

  public async createProduct(dto: CreateProductDTO): Promise<ProductEntity> {
    return this.productRepository.save(ProductEntity.fromObject(dto));
  }

  public async deleteProduct(id: string): Promise<void> {
    try{
      await this.productRepository.delete(id);
    } catch {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
  }
}
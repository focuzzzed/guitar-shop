import { PaginationResult } from '../../../types';
import { ProductRDO } from './product.rdo';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ProductWithPaginationRDO implements PaginationResult<ProductRDO> {
  @ApiProperty({
    description: 'List of products',
    type: [ProductRDO],
    example: [{
      id: 'a928035a-aaa9-4df9-999f-8de262c5be11',
      title: 'Sample Guitar',
      additionDate: '2024-02-11T23:54:01.826Z',
      photoUrl: 'server/static/02/12/image.jpeg',
      price: 985000,
    }],
  })
  @Expose()
  public entities: ProductRDO[];

  @ApiProperty({
    description: 'Total items count',
    example: 12,
  })
  @Expose()
  public totalItems: number;

  @ApiProperty({
    description: 'Counted number of pages for a given number of products',
    example: 2,
  })
  @Expose()
  public totalPages: number;

  @ApiProperty({
    description: 'Current page for skipping a certain number of products already received',
    example: 1,
  })
  @Expose()
  public currentPage: number;

  @ApiProperty({
    description: 'Number of products per page',
    example: 7,
  })
  @Expose()
  public itemsPerPage: number;
}
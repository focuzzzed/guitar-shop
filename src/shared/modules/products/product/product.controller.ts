import {
  Body, Controller, Delete, Get, HttpCode,
  HttpStatus, Param, Patch, Post, Query,
  UseGuards
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductQuery } from './query/product.query';
import { ProductWithPaginationRDO } from './rdo/product-with-pagination.rdo';
import { fillDTO } from '../../../helpers';
import { CreateProductDTO } from './dto/create-product.dto';
import { DetailedProductRDO } from './rdo/detailed-product.rdo';
import { ApiHeader, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateProductDTO } from './dto/update-product.dto';
import { JWTAuth } from '../../../libs/guards';
import { GuitarTypes, SortDirection } from '../../../types';
import { PRODUCT_AVAILABLE_VALUE } from './product.const';
import { SortField } from '../../../types/paginations/sort-field.enum';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
  ) { }

  @ApiQuery({
    name: 'limit',
    type: 'number',
    required: false,
    example: 3,
  })
  @ApiQuery({
    name: 'guitarTypes',
    type: 'string',
    enum: GuitarTypes,
    isArray: true,
    required: false,
    example: [GuitarTypes.Acoustic, GuitarTypes.Electro],
  })
  @ApiQuery({
    name: 'stringsCount',
    type: 'number',
    enum: Object.values(PRODUCT_AVAILABLE_VALUE.STRINGS_COUNT),
    isArray: true, required: false,
    example: [PRODUCT_AVAILABLE_VALUE.STRINGS_COUNT[0], PRODUCT_AVAILABLE_VALUE.STRINGS_COUNT[3]],
  })
  @ApiQuery({
    name: 'sortField',
    type: 'string',
    enum: Object.values(Object.values(SortField)),
    required: false,
    example: SortField.ByPrice,
  })
  @ApiQuery({
    name: 'sortDirection',
    type: 'string',
    enum: Object.values(Object.values(SortDirection)),
    required: false,
    example: SortDirection.Ascending,
  })
  @ApiQuery({
    name: 'page',
    type: 'number',
    required: false,
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Products with pagination',
    type: ProductWithPaginationRDO,
  })
  @Get('/')
  public async index(@Query() query: ProductQuery): Promise<ProductWithPaginationRDO> {
    const productsWithPagination = await this.productService.getAllProducts(query);
    const result = {
      ...productsWithPagination,
      entities: productsWithPagination.entities.map((entity) => entity.serialize()),
    };

    return fillDTO(ProductWithPaginationRDO, result);
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'JWT token',
    example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ...'
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Product successfully created',
    type: DetailedProductRDO
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'You have to be authorized to create a product',
  })
  @Post('/')
  @UseGuards(JWTAuth)
  public async create(@Body() dto: CreateProductDTO): Promise<DetailedProductRDO> {
    const createdProduct = await this.productService.createProduct(dto);
    return fillDTO(DetailedProductRDO, createdProduct.serialize());
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'JWT token',
    example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ...'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Product successfully updated',
    type: DetailedProductRDO
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Product with current id not found',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'You have to be authorized to update a product',
  })
  @UseGuards(JWTAuth)
  @Patch('/:id')
  public async update(@Param('id') id: string, @Body() dto: UpdateProductDTO): Promise<DetailedProductRDO> {
    const updatedProduct = await this.productService.updateProduct(id, dto);
    return fillDTO(DetailedProductRDO, updatedProduct.serialize());
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'JWT token',
    example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ...'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Product founded',
    type: DetailedProductRDO
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Product with current id not found',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'You have to be authorized to get detailed product information',
  })
  @UseGuards(JWTAuth)
  @Get('/:id')
  public async show(@Param('id') id: string) {
    const product = await this.productService.getProductById(id);
    return fillDTO(DetailedProductRDO, product.serialize());
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'JWT token',
    example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ...'
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Product deleted',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Product with current id not found',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'You have to be authorized to remove a product',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JWTAuth)
  @Delete('/:id')
  public async delete(@Param('id') id: string) {
    await this.productService.deleteProduct(id);
  }
}
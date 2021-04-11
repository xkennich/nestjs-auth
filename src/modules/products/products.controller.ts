import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Body,
  Put,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  getAll(): Promise<Product[]> {
    return this.productService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Product> {
    return this.productService.getOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProduct: CreateProductDto): Promise<Product> {
    return this.productService.create(createProduct);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(
    @Body() updateProduct: UpdateProductDto,
    @Param('id') productId: string,
  ): Promise<Product> {
    return this.productService.update(productId, updateProduct);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') productId: string): Promise<Product> {
    return this.productService.remove(productId);
  }
}

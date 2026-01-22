import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from 'src/infrastructure/services/product.service';
import { SearchProductsDTO } from '../dtos/products/search-product.dto';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { ProductDTO } from '../dtos/products/product.dto';
import { ErrorResponseDTO } from '../dtos/error-reponse.dto';
import { UpdateProductDTO } from '../dtos/products/update-product.dto';
import { AuthGuard } from '@nestjs/passport';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { CompareProductDTO } from '../dtos/products/compare-product.dto';

@UseInterceptors(CacheInterceptor)
@Controller('product')
export class ProductController {
  constructor(private readonly _productService: ProductService) {}

  @CacheKey('product_search')
  @CacheTTL(60)
  @ApiOkResponse({
    description:
      'Everything went fine, does not mean something was find though',
    isArray: true,
    type: ProductDTO,
  })
  @Get('search')
  async search(@Query() query: SearchProductsDTO) {
    const items = await this._productService.search(query);
    return items;
  }

  @CacheKey('product_get')
  @CacheTTL(300)
  @ApiOkResponse({
    description: 'Everything went fine and something was found',
    type: ProductDTO,
  })
  @ApiNotFoundResponse({
    description: 'The product was not found',
    type: ErrorResponseDTO,
  })
  @Get('get/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return await this._productService.findBySlug(slug);
  }

  @CacheKey('compared_products')
  @CacheTTL(300)
  @ApiOkResponse({
    description: 'Products were found',
    type:ProductDTO,
    isArray:true,
  })
  @ApiNotFoundResponse({
    description:"Could not found anything to compare the product to",
    type:ErrorResponseDTO,
  })
  @Get("compare")
  async compareProducts(@Query() data: CompareProductDTO) {
    return await this._productService.compare(data);
  }

  @Put('update/:id') //TODO: Permission middleware when it's done
  @ApiOkResponse({
    description: 'The product was updated',
    type: String,
  })
  @ApiNotFoundResponse({
    description: 'The product was not found',
    type: ErrorResponseDTO,
  })
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('id') id: string, @Body() body: UpdateProductDTO) {
    await this._productService.update(id, body);
    return 'Success';
  }

  @Delete('delete/:id') //
  @ApiOkResponse({
    description: 'The product was deleted',
    type: String,
  })
  @ApiNotFoundResponse({
    description: 'The product was not found',
    type: ErrorResponseDTO,
  })
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param('id') id: string) {
    //TODO: Permission middleware when it's done
    await this._productService.delete(id);
    return 'Success';
  }
}

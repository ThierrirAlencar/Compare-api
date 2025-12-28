import { Body, Controller, Get, Param, Put, Query } from "@nestjs/common";
import { ProductService } from "src/infrastructure/services/product.service";
import { SearchProductsDTO } from "../dtos/products/search-product.dto";
import { ApiNotFoundResponse, ApiOkResponse } from "@nestjs/swagger";
import { ProductDTO } from "../dtos/products/product.dto";
import { ErrorResponseDTO } from "../dtos/error-reponse.dto";
import { UpdateProductDTO } from "../dtos/products/update-product.dto";

@Controller("product")
export class ProductController {
    constructor(
        private readonly _productService: ProductService
    ){}

    @ApiOkResponse({
        description:"Everything went fine, does not mean something was find though",
        isArray:true,
        type: ProductDTO,
    })
    @Get("search")
    async search(@Query() query: SearchProductsDTO) {
        const items = await this._productService.search(query);
        return items;
    }

    @ApiOkResponse({
        description:"Everything went fine and something was found",
        type: ProductDTO,
    })
    @ApiNotFoundResponse({
        description:"The product was not found",
        type: ErrorResponseDTO,
    })
    @Get("get/:slug")
    async getBySlug(@Param("slug") slug: string) {
        return await this._productService.findBySlug(slug);
    }

    @Put("update/:id")
    @ApiOkResponse({
        description:"The product was updated",
        type: String,
    })
    @ApiNotFoundResponse({
        description:"The product was not found",
        type: ErrorResponseDTO,
    })
    async update(@Param("id") id: string, @Body() body: UpdateProductDTO){
        await this._productService.update(id, body);
        return "Success"
    }
}
import { Injectable } from "@nestjs/common";
import { SearchProductsDTO } from "src/app/dtos/products/search-product.dto";
import { ProductRepository } from "src/core/repositories/product.repository";
import { notFoundError } from "../utils/errors";

@Injectable()
export class ProductService {
    constructor(
        private readonly _productRepository: ProductRepository
    ){}

    async search(data: SearchProductsDTO) {
        const {take, page} = data;
        return await this._productRepository.search(data, take, page);
    }

    async findBySlug(slug: string) {
        const product = await this._productRepository.findBySlug(slug);
        if(!product){
            throw new notFoundError("O produto requisitado não foi encontrado");
        }
        return product;
    }

    async update(slug: string) {
        await this._productRepository.update(slug, {

            updated_at: new Date(),
        });
    }
}
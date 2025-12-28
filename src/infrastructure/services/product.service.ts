import { Injectable } from "@nestjs/common";
import { SearchProductsDTO } from "src/app/dtos/products/search-product.dto";
import { ProductRepository } from "src/core/repositories/product.repository";
import { notFoundError } from "../utils/errors";
import { UpdateProductDTO } from "src/app/dtos/products/update-product.dto";

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
            throw new notFoundError("O produto informado não foi encontrado");
        }
        return product;
    }

    async update(id: string, data: UpdateProductDTO) {
        const doesProductExists = await this._productRepository.findById(id);
        if(!doesProductExists){
            throw new notFoundError("O Produto informado não foi encontrado");
        }
        let updated_at;

        const ignoredKeys = ['take', 'page'];
        const isEmpty = Object.entries(data)
            .filter(([key]) => !ignoredKeys.includes(key))
            .every(([, value]) => value == null);

        if(!isEmpty){
            updated_at = new Date();
        }

        const {addTags,description,link,removeTags,status,store,title,value,where} = data;
        await this._productRepository.update(id, {
            link,
            value,
            title,
            store,
            where,
            status,
            description,
            updated_at,
        });
    }

    async delete(id: string) {
        await this._productRepository.delete(id);
    }
}
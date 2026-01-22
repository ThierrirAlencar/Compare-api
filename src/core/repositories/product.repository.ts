import { Prisma, Product } from "generated/prisma/client";
import { CompareProductDTO, CompareProductServiceDTO } from "src/app/dtos/products/compare-product.dto";
import { SearchProductsDTO } from "src/app/dtos/products/search-product.dto";

export abstract class ProductRepository {
    abstract create(data: Prisma.ProductCreateInput): Promise<Product>
    abstract compare(data: CompareProductServiceDTO): Promise<Product[]>
    abstract findById(id: string): Promise<Product | null>
    abstract findBySlug(slug: string): Promise<Product | null>
    abstract findTags(id: string): Promise<string[]>
    abstract search(data: SearchProductsDTO, take?: number, page?: number): Promise<Product[]>
    abstract update(id: string, data: Prisma.ProductUncheckedUpdateInput): Promise<void>
    abstract delete(id: string): Promise<void>
}
import { Prisma, Product } from "generated/prisma/client";
import { SearchProductsDTO } from "src/app/dtos/products/search-product.dto";

export abstract class ProductRepository {
    abstract create(data: Prisma.ProductCreateInput): Promise<Product>
    abstract findById(id: string): Promise<Product | null>
    abstract findBySlug(slug: string): Promise<Product | null>
    abstract search(data: SearchProductsDTO, take?: number, page?: number): Promise<Product[]>
    abstract update(slug: string, data: Prisma.ProductUncheckedUpdateInput): Promise<void>
    abstract delete(id: string): Promise<void>
}
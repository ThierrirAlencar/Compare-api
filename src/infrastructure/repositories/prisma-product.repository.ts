import { Product } from "generated/prisma/client";
import { ProductCreateInput, ProductUncheckedUpdateInput } from "generated/prisma/models";
import { ProductRepository } from "src/core/repositories/product.repository";
import { PrismaService } from "../database/prisma.service";
import { SearchProductsDTO } from "src/app/dtos/products/search-product.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaProductRepository extends ProductRepository {
    constructor(
        private readonly _prismaService: PrismaService
    ){
        super();
    }

    async create(data: ProductCreateInput): Promise<Product> {
        return await this._prismaService.product.create({
            data,
        })
    }

    async search(data: SearchProductsDTO, take?: number, page?: number): Promise<Product[]> {
        const {link,maxPrice,minPrice,rawText,store,tags} = data;
        const skip = (take ? page*(take-1) : 0);
        return await this._prismaService.product.findMany({
            skip,
            take,
            where:{
                value:(minPrice||maxPrice?{
                    gte:minPrice,
                    lte:maxPrice,
                }:undefined),
                link:{
                    contains:link,
                    mode:"insensitive"
                },
                store:{
                    in:store
                },
                status:{
                    notIn:["DEACTIVE","DELETED"],
                },
                OR:[
                {
                    title:{
                        contains:rawText,
                        mode:"insensitive",
                    }
                },
                {
                    description:{
                        contains:rawText,
                        mode:"insensitive",
                    },
                }
                ]
            },
        })
    }

    async findBySlug(slug: string): Promise<Product | null> {
        return await this._prismaService.product.findUnique({
            where:{
                slug,
            },
            include:{
                priceHistory:true,
            }
        })
    }

    async findById(id: string): Promise<Product | null> {
        return await this._prismaService.product.findUnique({
            where:{
                id,
            }
        })
    }

    async update(id: string, data: ProductUncheckedUpdateInput): Promise<void> {
        await this._prismaService.product.update({
            where:{
                id,
            },
            data,
        })
    }

    async delete(id: string): Promise<void> {
        await this._prismaService.product.update({
            where:{
                id,
            },
            data:{
                status:"DELETED",
                deleted_at:new Date(),
            }
        })
    }
}
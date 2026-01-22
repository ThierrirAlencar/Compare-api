import { Prisma, Product } from "generated/prisma/client";
import { ProductRepository } from "src/core/repositories/product.repository";
import { PrismaService } from "../database/prisma.service";
import { SearchProductsDTO } from "src/app/dtos/products/search-product.dto";
import { Injectable } from "@nestjs/common";
import { CompareProductServiceDTO } from "src/app/dtos/products/compare-product.dto";

@Injectable()
export class PrismaProductRepository extends ProductRepository {
    constructor(
        private readonly _prismaService: PrismaService
    ){
        super();
    }

    async create(data: Prisma.ProductCreateInput): Promise<Product> {
        return await this._prismaService.product.create({
            data,
        })
    }

    async search(data: SearchProductsDTO): Promise<Product[]> {
        const {link,maxPrice,minPrice,rawText,store,tags,page,take} = data;
        const currentPage = page ?? 1;
        const currentTake = take ?? 10;
        const skip = (currentPage - 1) * currentTake;

        return this._prismaService.product.findMany({
            skip,
            take: currentTake,
            where: {
                status: {
                    notIn: ['DEACTIVE', 'DELETED'],
                },

                ...(minPrice !== undefined || maxPrice !== undefined
                    ? {
                        value: {
                        ...(minPrice !== undefined && { gte: minPrice }),
                        ...(maxPrice !== undefined && { lte: maxPrice }),
                        },
                    }
                    : {}),

                ...(link !== undefined && {
                    link: {
                    contains: link,
                    mode: 'insensitive',
                    },
                }),

                ...(store?.length && {
                    store: {
                        in: store,
                    },
                }),

                ...(rawText !== undefined && {
                    OR: [
                    {
                        title: {
                        contains: rawText,
                        mode: 'insensitive',
                        },
                    },
                    {
                        description: {
                        contains: rawText,
                        mode: 'insensitive',
                        },
                    },
                    ],
                }),

                ...(tags?.length && {
                    tags: {
                    some: {
                        id: {
                        in: tags,
                        },
                    },
                    },
                }),
            },
        });
    }

    async compare(data: CompareProductServiceDTO): Promise<Product[]> {
        const {tags,stores} = data
        return await this._prismaService.product.findMany({
            where:{
                productTag:{
                    some:{
                        tagId: {
                            in: tags
                        }
                    }
                },
                ...(stores?.length && {
                    store:{
                        in:stores
                    }
                })
            },
            include:{
                priceHistory: true,
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

    async findTags(id: string): Promise<string[]> {
        const tags = await this._prismaService.productTag.findMany({
            where:{
                productId:id,
                tag:{
                    type:{
                        in:["CATEGORY","SERIE","MODEL"]
                    }
                }
            },
        })
        return tags.map(tag => {
            return tag.tagId
        })
    }

    async update(id: string, data: Prisma.ProductUncheckedUpdateInput): Promise<void> {
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
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { GeneralStatus, StoreKind } from "generated/prisma/enums";

export class SearchProductsDTO {
    @ApiProperty({
        required:false,
        type:"number"
    })
    @IsOptional()
    take?: number;

    @ApiProperty({
        required:false,
        type:"number"
    })
    @IsOptional()
    page?: number;

    @ApiProperty({
        required:false,
    })
    @IsOptional()
    rawText?: string;

    @ApiProperty({
        required:false,
        enum:StoreKind
    })
    @IsOptional()
    store?: StoreKind;

    @ApiProperty({
        required:false,
        type:'number'
    })
    @IsOptional()
    minPrice?: number;

    @ApiProperty({
        required:false,
        type:"number"
    })
    @IsOptional()
    maxPrice?: number;

    @ApiProperty({
        required:false
    })
    @IsOptional()
    link?: string;

    @ApiProperty({
        required:false
    })
    @IsOptional()
    tags?: string[];
}
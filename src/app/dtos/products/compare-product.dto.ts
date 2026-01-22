import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";
import { StoreKind } from "generated/prisma/enums";

export class CompareProductDTO {
    @ApiProperty()
    @IsNotEmpty()
    prodId: string;

    @ApiProperty({
        description:"Optional. Specific stores to compare, if not defined returns all prices in every store.",
        enum:StoreKind,
        isArray:true,
    })
    @IsOptional()
    stores: StoreKind[]
}

export class CompareProductServiceDTO {
    @ApiProperty()
    @IsNotEmpty()
    tags: string[];

    @ApiProperty({
        description:"Optional. Specific stores to compare, if not defined returns all prices in every store.",
        enum:StoreKind,
        isArray:true,
    })
    @IsOptional()
    stores: StoreKind[]
}
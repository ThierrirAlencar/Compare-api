import { ApiProperty } from "@nestjs/swagger";
import { GeneralStatus } from "@prisma/client";
import { IsOptional } from "class-validator";
import { StoreKind } from "generated/prisma/enums";

export class UpdateProductDTO {

    @ApiProperty({
        required:false
    })
    @IsOptional()
    title: string;

    @ApiProperty({
        required:false
    })
    @IsOptional()
    description: string;

    @ApiProperty({
        required:false,
        type:"number"
    })
    @IsOptional()
    value: number;

    @ApiProperty({
        required:false
    })
    @IsOptional()
    link: string;

    @ApiProperty({
        required:false
    })
    @IsOptional()
    where: string;

    @ApiProperty({
        required:false
    })
    @IsOptional()
    removeTags: string[];

    @ApiProperty({
        required:false
    })
    @IsOptional()
    addTags: string[];

    @ApiProperty({
        required:false,
        enum:StoreKind
    })
    @IsOptional()
    store: StoreKind;

    @ApiProperty({
        required:false,
        enum:GeneralStatus
    })
    @IsOptional()
    status: GeneralStatus;
}
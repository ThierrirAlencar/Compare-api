import { ApiProperty } from "@nestjs/swagger";
import { GeneralStatus } from "@prisma/client";
import { StoreKind } from "generated/prisma/enums";

export class UpdateProductDTO {

    @ApiProperty({
        required:false
    })
    title?: string;

    @ApiProperty({
        required:false
    })
    description?: string;

    @ApiProperty({
        required:false,
        type:"number"
    })
    value?: number;

    @ApiProperty({
        required:false
    })
    link?: string;

    @ApiProperty({
        required:false
    })
    where?: string;

    @ApiProperty({
        required:false
    })
    removeTags?: string[];

    @ApiProperty({
        required:false
    })
    addTags?: string[];

    @ApiProperty({
        required:false,
        enum:StoreKind
    })
    store?: string;

    @ApiProperty({
        required:false,
        enum:GeneralStatus
    })
    status?: GeneralStatus;
}
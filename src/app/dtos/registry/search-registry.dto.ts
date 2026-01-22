import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEnum, IsNumber, IsOptional } from "class-validator";
import { GeneralStatus, StoreKind } from "generated/prisma/enums";

export class SearchRegistryDTO {
    @ApiProperty({
        description:"search for registrys after this date",
        type: Date,
    })
    @IsOptional()
    @IsDate()
    afterDate?: Date;

    @ApiProperty({
        description:"search for registrys before this date",
        type: Date,
    })
    @IsOptional()
    @IsDate()
    beforeDate?: Date;

    @ApiProperty({
        enum: GeneralStatus,
    })
    @IsOptional()
    status?: GeneralStatus;

    @ApiProperty({
        enum: StoreKind,
    })
    @IsOptional()
    store?: StoreKind;

    @ApiProperty({
        description:"Optional, take this amount of registrys, default is 20",
        type: Number,
    })
    @IsOptional()
    @IsNumber()
    take?: number;

    @ApiProperty({
        type: Number,
    })
    @IsOptional()
    @IsNumber()
    page?: number;
}
import { ApiProperty } from "@nestjs/swagger";
import { GeneralStatus, StoreKind } from "generated/prisma";

export class RegistryDTO {
    @ApiProperty()
    id: string;

    @ApiProperty({
        enum: StoreKind,
    })
    store: StoreKind;

    @ApiProperty({
        enum: GeneralStatus,
    })
    status: GeneralStatus;

    @ApiProperty()
    createdAt: Date;

    updatedAt?: Date;

    deletedAt?: Date;
}
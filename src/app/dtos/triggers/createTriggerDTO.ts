import { ApiProperty } from "@nestjs/swagger"
import { GeneralStatus } from "generated/prisma/enums"
import { number } from "zod"


export class createTriggerDTO{

    @ApiProperty({
        description:"Id do produto (em uuid)",
        type:"string"
    })
    prodId:string

    @ApiProperty({
        description:"Preço definido (float)",
        type:"number"
    })
    targetPrice:number

    @ApiProperty({
        description:"Status de ativação do enum (deixe vazio se não souber mexer nisso aqui)",
        nullable:true,
        enum:GeneralStatus,
        default:GeneralStatus.ACTIVE
    })
    status?:GeneralStatus
}

export class createTriggerSuccessDTO{

    @ApiProperty({
        description:"Data da criação do trigger",
    })
    created_at?: Date;
    @ApiProperty({
        description:"Data que o trigger foi deletado",
    })
    deleted_at?: Date;

    @ApiProperty({
        description:"Data que o trigger foi atualizado",
    })
    updated_at?: Date;

    @ApiProperty({
        description:"id do produto",
    })
    prodId: string;

    @ApiProperty({
        description:"Status do produto",
        enum:GeneralStatus
    })
    status: GeneralStatus;
    
    @ApiProperty({
        description:"Id do produto em (cuid)",
        type:"string"
    })
    id: string;

    @ApiProperty({
        description:"preço objetivado",
        type:"number"
    })
    targetPrice: number;
}


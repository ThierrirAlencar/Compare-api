import { GeneralStatus, user } from "generated/prisma";



export class mapper_safe_user implements Partial<user>{
    created_at?: Date;
    deleted_at?: Date;
    email?: string;
    name?: string;
    password?: string;
    status?: GeneralStatus;
    updated_at?: Date;
}
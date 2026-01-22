import { GeneralStatus, trigger } from "generated/prisma/client";

/**
 * this Class is a a mapper of trigger from repository to services (returns no user_id but not beyond that)
 *
 * @extends Partial<trigger>
 * @public *
 */
export class mapper_trigger_to_service implements Partial<trigger>{
    created_at?: Date;
    deleted_at?: Date;
    prodId?: string;
    status?: GeneralStatus;
    id?: string;
    targetPrice?: string;
    updated_at?: Date;
}
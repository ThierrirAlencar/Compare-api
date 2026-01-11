import { PrismaClient } from "generated/prisma/client";
import { Logger } from "src/infrastructure/utils/logger";



export const createCoreGroups = async (prismaLegacy:PrismaClient)=>{
    const _isThereAdminGroup = await prismaLegacy.groups.findUnique({
        where:{
            name:"ADMIN"
        }
    })
    const _isThereUserGroups = await prismaLegacy.groups.findUnique({
        where:{
            name:"USER"
        }
    })
    
    const l = new Logger(false, "Seeding")

    if(!_isThereAdminGroup){
        l.warn("No admin group found, seeding a new one")
        const _a = await prismaLegacy.groups.create({
            data:{
                name:"ADMIN",
                description:"Default Administrative role",
                status:"ACTIVE",
            }
        })
        l.warn("seed of admin completed")
    }
    if(!_isThereUserGroups){
        l.warn("No user group found, seeding a new one")
        const _a = await prismaLegacy.groups.create({
            data:{
                name:"USER",
                description:"Default user role",
                status:"ACTIVE",
            }
        })
        l.warn("seed of user completed")
    }

}
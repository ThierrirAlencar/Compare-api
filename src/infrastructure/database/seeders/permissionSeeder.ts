import { PrismaClient } from "generated/prisma/client"
import { userPermissions } from "src/app/permissions"
import { groupPermissions } from "src/app/permissions/groups.permissions"
import { admnistrativeProductsPermissions, generalProductsPermissions } from "src/app/permissions/products.permissions"
import { triggerPermissions } from "src/app/permissions/trigger.permissions"


export const createCorePermissions = async (prismaLegacy: PrismaClient) => {
    const commonUserPermissions = [
        ...generalProductsPermissions,
        ...triggerPermissions,
        ...userPermissions
    ]
    const adminUserPermissions = [
        ...commonUserPermissions,
        ...admnistrativeProductsPermissions,
        ...groupPermissions
    ]

    try {
        await Promise.all(
            adminUserPermissions.map(permission =>
                prismaLegacy.permission.upsert({
                    where: { name: permission.name },
                    update: {},
                    create: permission,
                })
            )
        )

        const [adminGroup, userGroup, permissions] = await Promise.all([
            prismaLegacy.groups.findUnique({ where: { name: "ADMIN" } }),
            prismaLegacy.groups.findUnique({ where: { name: "USER" } }),
            prismaLegacy.permission.findMany({
                where: {
                    name: { in: adminUserPermissions.map(p => p.name) }
                }
            })
        ])

        const permissionMap = new Map(permissions.map(p => [p.name, p.id]))

        const adminAssociations = adminUserPermissions.map(p => ({
            group_id: adminGroup.id,
            permission_id: permissionMap.get(p.name)
        }))

        const userAssociations = commonUserPermissions.map(p => ({
            group_id: userGroup.id,
            permission_id: permissionMap.get(p.name)
        }))

        await Promise.all([
            ...adminAssociations.map(assoc =>
                prismaLegacy.group_permissions.upsert({
                    where: { group_id_permission_id: assoc },
                    update: {},
                    create: assoc,
                })
            ),
            ...userAssociations.map(assoc =>
                prismaLegacy.group_permissions.upsert({
                    where: { group_id_permission_id: assoc },
                    update: {},
                    create: assoc,
                })
            )
        ])
    } catch (err) {
        console.error("Error seeding permissions:", err)
        throw err
    }
}
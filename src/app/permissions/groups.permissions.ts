import { permissionJson } from "src/core/types/permissionJson";


export const groupPermissions:permissionJson[] = [
    {
        name:"CREATE_A_GROUP",
        module:"GROUPS",
        permission:"CREATE_A_GROUP",
        description:"Allows an user to create a group",
        uri:"/group/create",
    },
    {
        name:"UPDATE_A_GROUP",
        module:"GROUPS",
        permission:"UPDATE_A_GROUP",
        description:"Allows an user to update a group",
        uri:"/group/update/:id",
    },
    {
        name:"DELETE_A_GROUP",
        module:"GROUPS",
        permission:"DELETE_A_GROUP",
        description:"Allows an user to delete a group",
        uri:"/group/delete/:id",
    },
    {
        name:"ASSIGN_A_PERMISSION_TO_GROUP",
        module:"GROUPS",
        permission:"ASSIGN_A_PERMISSION_TO_GROUP",
        description:"Allows an user to add a permission to a group",
        uri:"/group/assign/permission",
    },
    {
        name:"ASSIGN_A_GROUP_TO_AN_USER",
        module:"GROUPS",
        permission:"ASSIGN_A_GROUP_TO_AN_USER",
        description:"Allows an user to add an user into a group",
        uri:"/group/assign/user",
    }
]
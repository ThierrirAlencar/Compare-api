import { permissionJson } from "src/core/types/permissionJson";

export const userPermissions:permissionJson[] = [
    {
        name:"UPDATE_USER",
        module:"USER",
        permission:"UPDATE_USER",
        description:"Allows an user to update an user",
        uri:"/user/update"
    }
]
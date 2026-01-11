import { permissionJson } from "src/core/types/permissionJson";


export const permissionsCorePermissions:permissionJson[] = [
    {
        module:"PERMISSION",
        name:"GET_ALL_PERMISSIONS",
        uri:"",
        permission:"GET_ALL_PERMISSIONS",
        description:"Allows user to get all permissions"
    },
    {
        module:"PERMISSION",
        name:"GET_ONE_PERMISSION",
        uri:"/permission/get/:id",
        permission:"GET_ONE_PERMISSION",
        description:"Allows user to get a specific permissions"
    },
    {
        module:"PERMISSION",
        name:"UPDATE_PERMISSION",
        uri:"/permission/update/:id",
        permission:"UPDATE_PERMISSION",
        description:"Allows user to update a specific permissions"
    },
    {
        module:"PERMISSION",
        name:"DELETE_PERMISSION",
        uri:"/permission/delete/:id",
        permission:"DELETE_PERMISSION",
        description:"Allows user to delete a specific permissions"
    }
]
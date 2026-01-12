import { permissionJson } from "src/core/types/permissionJson";

export const triggerPermissions:permissionJson[] = [
    {
        name:"CREATE_TRIGGER",
        module:"TRIGGER",
        permission:"CREATE_TRIGGER",
        description:"Allows an user to create a Trigger",
        uri:"/trigger"
    },
    {
        name:"UPDATE_TRIGGER",
        module:"TRIGGER",
        permission:"UPDATE_TRIGGER",
        description:"Allows an user to update a Trigger",
        uri:"/trigger/update/:id"
    },
    {
        module:"TRIGGER",
        permission:"DELETE_TRIGGER",
        name:"DELETE_TRIGGER",
        uri:"/trigger/delete/:id",
        description:"Allows an user to delete a Trigger",
    },
    {
        module:"TRIGGER",
        permission:"GET_ONE_TRIGGER",
        name:"GET_ONE_TRIGGER",
        uri:"/trigger/getone/:id",
        description:"Allows an user to get one Trigger",
    },
        {
        module:"TRIGGER",
        permission:"GET_ALL_TRIGGERS",
        name:"GET_ALL_TRIGGERS",
        uri:"/trigger/all",
        description:"Allows an user to get all Triggers",
    }
]
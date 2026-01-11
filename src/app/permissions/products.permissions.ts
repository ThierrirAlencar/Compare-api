import { permissionJson } from "src/core/types/permissionJson";

export const generalProductsPermissions:permissionJson[] = [
    {
        module:"PRODUCTS",
        name:"SEARCH_PRODUCTS",
        permission:"SEARCH_PRODUCTS",
        uri:"/product/search",
        description:"Allows an user to search for products"
    },
    {   
        module:"PRODUCTS",
        name:"GET_A_PRODUCT_BY_SLUG",
        permission:"GET_A_PRODUCT_BY_SLUG",
        uri:"/product/get/:slug",
        description:"Allows an user to GET a product by its slug"
    },

]

export const admnistrativeProductsPermissions:permissionJson[] = [
    {
        module:"PRODUCTS",
        name:"UPDATE_PRODUCT",
        permission:"UPDATE_PRODUCT",
        uri:"/product/update/:id",
        description:"Allows an user to update a product" 
    },
    {
        module:"PRODUCTS",
        name:"DELETE_A_PRDUCT",
        permission:"DELETE_A_PRDUCT",
        uri:"/product/delete/:id",
        description:"Allows an user to delete a product"
    }
]
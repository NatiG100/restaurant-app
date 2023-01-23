import { AxiosResponse } from "axios";
import { TypePermission } from "../assets/permissions";
import { TypeCustomeErrorResponse, TypeMultiDataResponse } from "../types/types";
import instance from "./instance";

export const fetchAllFoodCategories = async ()=>{
    return instance.get<TypeCustomeErrorResponse,TypeMultiDataResponse>('/food-categories')
}

export interface TypeAddFoodCategory{
    name:string,
    description:string,
    img:File|null,
}
export const addFoodCategory = async(data:TypeAddFoodCategory)=>{
    //create form data and append fields
    const formData = new FormData();
    formData.append("name",data.name);
    formData.append("description",data.description);
    data.img&&formData.append("img",data.img,data.img.name);
    return instance.post<TypeCustomeErrorResponse,TypeMultiDataResponse>('/food-categories',formData,{
        headers:{
            "Content-Type": "multipart/form-data",
        }
    })
}

// //update user service
// export const updateUser = async({data,id}:{data:TypeAddUser,id:string})=>{
//     //create form data and append fields
//     const formData = new FormData();
//     formData.append("email",data.email);
//     formData.append("fullName",data.fullName);
//     data.previlages.forEach((previlage)=>{
//         formData.append("previlages",previlage);
//     })
//     data.img&&formData.append("img",data.img,data.img.name);
//     return instance.patch<TypeCustomeErrorResponse,TypeMultiDataResponse>(`/users/${id}/update`,formData,{
//         headers:{
//             "Content-Type": "multipart/form-data",
//         }
//     })
// }

// //change usuer status service
// export const changeUserStatus = async(data:{status:"Active"|"Suspended",id:string})=>{
//     return instance.patch<TypeCustomeErrorResponse,TypeMultiDataResponse>(`/users/${data.id}/change-status`,{status:data.status});
// }
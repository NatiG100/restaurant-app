import { AxiosResponse } from "axios";
import { TypePermission } from "../assets/permissions";
import { TypeCustomeErrorResponse, TypeMultiDataResponse } from "../types/types";
import instance from "./instance";

export const fetchAllFoods = async ({categoryId}:{categoryId:string})=>{
    return instance.get<TypeCustomeErrorResponse,TypeMultiDataResponse>(`/foods?categoryId=${categoryId}`)
}

export interface TypeAddFood{
    name:string,
    description:string,
    cost:Number,
    img:File|null,
    categoryId:string,
}
export const addFood = async(data:TypeAddFood)=>{
    //create form data and append fields
    const formData = new FormData();
    formData.append("name",data.name);
    formData.append("description",data.description);
    formData.append("cost",data.cost.toString())
    data.img&&formData.append("img",data.img,data.img.name);
    return instance.post<TypeCustomeErrorResponse,TypeMultiDataResponse>(`/foods?categoryId=${data.categoryId}`,formData,{
        headers:{
            "Content-Type": "multipart/form-data",
        }
    })
}

// //update food category service
// export interface TypeUpdateFoodCategory{
//     data:TypeAddFoodCategory,
//     id:string
// }
// export const updateFoodCategory = async({data,id}:TypeUpdateFoodCategory)=>{
//     //create form data and append fields
//     const formData = new FormData();
//     formData.append("name",data.name);
//     formData.append("description",data.description);
//     data.img&&formData.append("img",data.img,data.img.name);
//     return instance.patch<TypeCustomeErrorResponse,TypeMultiDataResponse>(`/food-categories/${id}/update`,formData,{
//         headers:{
//             "Content-Type": "multipart/form-data",
//         }
//     })
// }

// //change food category status service
// export interface TypeChangeFoodCategoryStatus{
//     status:"Active"|"Suspended",
//     id:string
// }
// export const changeFoodCategoryStatus = async(data:TypeChangeFoodCategoryStatus)=>{
//     return instance.patch<TypeCustomeErrorResponse,TypeMultiDataResponse>(`/food-categories/${data.id}/change-status`,{status:data.status});
// }
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

//update food category service
export interface TypeUpdateFoodCategory{
    data:TypeAddFoodCategory,
    id:string
}
export const updateFoodCategory = async({data,id}:TypeUpdateFoodCategory)=>{
    //create form data and append fields
    const formData = new FormData();
    formData.append("name",data.name);
    formData.append("description",data.description);
    data.img&&formData.append("img",data.img,data.img.name);
    return instance.patch<TypeCustomeErrorResponse,TypeMultiDataResponse>(`/food-categories/${id}/update`,formData,{
        headers:{
            "Content-Type": "multipart/form-data",
        }
    })
}

//change food category status service
export interface TypeChangeFoodCategoryStatus{
    status:"Active"|"Suspended",
    id:string
}
export const changeFoodCategoryStatus = async(data:TypeChangeFoodCategoryStatus)=>{
    return instance.patch<TypeCustomeErrorResponse,TypeMultiDataResponse>(`/food-categories/${data.id}/change-status`,{status:data.status});
}
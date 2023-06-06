import { TypeCustomeErrorResponse, TypeMultiDataResponse } from "../types/types";
import instance from "./instance";

export const fetchAllDrinkCategories = async ()=>{
    return instance.get<TypeCustomeErrorResponse,TypeMultiDataResponse>('/drink-categories')
}

export interface TypeAddDrinkCategory{
    name:string,
    description:string,
    img:File|null,
}
export const addDrinkCategory = async(data:TypeAddDrinkCategory)=>{
    //create form data and append fields
    const formData = new FormData();
    formData.append("name",data.name);
    formData.append("description",data.description);
    data.img&&formData.append("img",data.img,data.img.name);
    return instance.post<TypeCustomeErrorResponse,TypeMultiDataResponse>('/drink-categories',formData,{
        headers:{
            "Content-Type": "multipart/form-data",
        }
    })
}

//update food category service
export interface TypeUpdateDrinkCategory{
    data:TypeAddDrinkCategory,
    id:string
}
export const updateDrinkCategory = async({data,id}:TypeUpdateDrinkCategory)=>{
    //create form data and append fields
    const formData = new FormData();
    formData.append("name",data.name);
    formData.append("description",data.description);
    data.img&&formData.append("img",data.img,data.img.name);
    return instance.patch<TypeCustomeErrorResponse,TypeMultiDataResponse>(`/drink-categories/${id}/update`,formData,{
        headers:{
            "Content-Type": "multipart/form-data",
        },
    })
}

//change food category status service
export interface TypeChangeDrinkCategoryStatus{
    status:"Active"|"Suspended",
    id:string
}
export const changeDrinkCategoryStatus = async(data:TypeChangeDrinkCategoryStatus)=>{
    return instance.patch<TypeCustomeErrorResponse,TypeMultiDataResponse>(`/drink-categories/${data.id}/change-status`,{status:data.status},
    );
}
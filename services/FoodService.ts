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

//update food category service
export interface TypeUpdateFood{
    name:string,
    description:string,
    cost:Number,
    img:File|null,
    id:string
}
export const updateFood = async({name,description,cost,img,id}:TypeUpdateFood)=>{
    //create form data and append fields
    const formData = new FormData();
    formData.append("name",name);
    formData.append("description",description);
    formData.append("cost",cost.toString())
    img&&formData.append("img",img,img.name);
    return instance.patch<TypeCustomeErrorResponse,TypeMultiDataResponse>(`/foods/${id}/update`,formData,{
        headers:{
            "Content-Type": "multipart/form-data",
        }
    })
}

//change food status service
export interface TypeChangeFoodStatus{
    status:"Active"|"Suspended",
    id:string
}
export const changeFoodCategoryStatus = async(data:TypeChangeFoodStatus)=>{
    return instance.patch<TypeCustomeErrorResponse,TypeMultiDataResponse>(`/foods/${data.id}/change-status`,{status:data.status});
}
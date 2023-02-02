import { TypeCustomeErrorResponse, TypeMultiDataResponse } from "../types/types";
import instance from "./instance";

export const fetchAllDrinks = async ({categoryId}:{categoryId:string})=>{
    return instance.get<TypeCustomeErrorResponse,TypeMultiDataResponse>(`/drinks?categoryId=${categoryId}`)
}

export interface TypeAddDrink{
    name:string,
    description:string,
    cost:Number,
    img:File|null,
    categoryId:string,
}
export const addDrink = async(data:TypeAddDrink)=>{
    //create form data and append fields
    const formData = new FormData();
    formData.append("name",data.name);
    formData.append("description",data.description);
    formData.append("cost",data.cost.toString())
    data.img&&formData.append("img",data.img,data.img.name);
    return instance.post<TypeCustomeErrorResponse,TypeMultiDataResponse>(`/drinks?categoryId=${data.categoryId}`,formData,{
        headers:{
            "Content-Type": "multipart/form-data",
        }
    })
}

//update food category service
export interface TypeUpdateDrink{
    name:string,
    description:string,
    cost:Number,
    img:File|null,
    id:string
}
export const updateDrink = async({name,description,cost,img,id}:TypeUpdateDrink)=>{
    //create form data and append fields
    const formData = new FormData();
    formData.append("name",name);
    formData.append("description",description);
    formData.append("cost",cost.toString())
    img&&formData.append("img",img,img.name);
    return instance.patch<TypeCustomeErrorResponse,TypeMultiDataResponse>(`/drinks/${id}/update`,formData,{
        headers:{
            "Content-Type": "multipart/form-data",
        }
    })
}

//change food status service
export interface TypeChangeDrinkStatus{
    status:"Active"|"Suspended",
    id:string
}
export const changeDrinkStatus = async(data:TypeChangeDrinkStatus)=>{
    return instance.patch<TypeCustomeErrorResponse,TypeMultiDataResponse>(`/drinks/${data.id}/change-status`,{status:data.status});
}
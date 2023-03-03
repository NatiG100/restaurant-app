import { TypeCustomeErrorResponse, TypeMultiDataResponse } from "../types/types"
import instance from "./instance"

export const fetchAllFoodCategories = async ()=>{
    return instance.get<TypeCustomeErrorResponse,TypeMultiDataResponse>('/food-categories?status=Active')
}
export const fetchAllFoods = async ({categoryId}:{categoryId:string})=>{
    return instance.get<TypeCustomeErrorResponse,TypeMultiDataResponse>(`/foods?categoryId=${categoryId}&status=Active`)
}
export const fetchAllDrinkCategories = async ()=>{
    return instance.get<TypeCustomeErrorResponse,TypeMultiDataResponse>('/drink-categories?status=Active')
}
export const fetchAllDrinks = async ({categoryId}:{categoryId:string})=>{
    return instance.get<TypeCustomeErrorResponse,TypeMultiDataResponse>(`/drinks?categoryId=${categoryId}&status=Active`)
}
export interface TypeRequestOrder{
    totalCost:number,
    tableNumber:string,
    items:{
        itemType:"food"|"drink",
        img:string,
        name:string,
        cost:number,
        amount:number,
        itemId:string,
    }[]
}
export const requestOrder = async(data:TypeRequestOrder)=>{
    return instance.post<TypeCustomeErrorResponse,TypeMultiDataResponse>(`/orders`,data)
}
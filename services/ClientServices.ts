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
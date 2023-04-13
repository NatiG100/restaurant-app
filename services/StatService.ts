import { ErrorResponse } from "../types/types"
import instance from "./instance"

export interface GeneralStat{
    data:{
        foodCount:number,
        drinkCount:number,
        salesDelta:number|'-',
        weeklySales:number,
        weeklyDrinkIncrease:number|"-",
        weeklyFoodIncrease:number|"-",
    }
}
export const getGeneralStat = async ()=>{
    return instance.get<ErrorResponse,GeneralStat>('/stats/general',{withCredentials:true});
}

export interface TypeTopItems{
    data:{
        topFoods:{
            _id:string,
            total:number,
            amount:number,
            img:string,
            name:string,
        }[],
        topDrinks:{
            _id:string,
            total:number,
            amount:number,
            img:string,
            name:string,
        }[]
    }
}
export const getTopItems = async (howMany=5)=>{
    return instance.get<ErrorResponse,TypeTopItems>(`/stats/top-items?howMany=${howMany}`,{withCredentials:true});
}
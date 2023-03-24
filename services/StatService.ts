import { ErrorResponse } from "../types/types"
import instance from "./instance"

export interface GeneralStat{
    data:{
        foodCount:number,
        drinkCount:number,
        weeklySales:number,
        weeklyDrinkIncrease:number|"-",
        weeklyFoodIncrease:number|"-",
    }
}
export const getGeneralStat = async ()=>{
    return instance.get<ErrorResponse,GeneralStat>('/stats/general',{withCredentials:true});
}
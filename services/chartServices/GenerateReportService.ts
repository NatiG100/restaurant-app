import { ErrorResponse } from "../../types/types"
import instance from "../instance"

export type TypeReportItem = {
    drink:number,
    avgDrink:number,
    food:number,
    avgFood:number,
    total:number,
    avgTotal:number,
}
export interface TypeGenerateStatRes{
    data:{
        order:TypeReportItem,
        sales:TypeReportItem,
    }
}

export const GenerateReport = async (from:string,to:string)=>{
    return instance.get<ErrorResponse,TypeGenerateStatRes>(`/stats/generate?from=${from}&to=${to}`);
}
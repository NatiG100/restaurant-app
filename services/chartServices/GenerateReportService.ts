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
    order:TypeReportItem,
    sales:TypeReportItem,
}

export const GenerateReport = async (from:Date,to:Date)=>{
    return instance.get<ErrorResponse,TypeReportItem>(`/stats/generate?from=${from}&to=${to}`);
}
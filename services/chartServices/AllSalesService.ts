import { ErrorResponse } from "../../types/types"
import instance from "../instance"

export interface TypeAllSalesChart{
    data:{
        _id:string,
        total:number,
    }[]
}

export const getAllsales = async (itemType:"food"|"drink"|"all")=>{
    return instance.get<ErrorResponse,TypeAllSalesChart>(`/stats/sales-all?&itemType=${itemType}`);
}
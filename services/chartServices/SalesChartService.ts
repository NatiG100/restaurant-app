import { ErrorResponse } from "../../types/types"
import instance from "../instance"

export interface TypeSalesChart{
    data:{
        _id:string,
        total:number,
    }[]
}

export const getSalesChartData = async (chartType:string,itemType:"food"|"drink"|"all")=>{
    return instance.get<ErrorResponse,TypeSalesChart>(`/stats/sales?type=${chartType}&itemType=${itemType}`);
}
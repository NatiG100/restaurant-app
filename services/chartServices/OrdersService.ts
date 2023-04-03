import { ErrorResponse } from "../../types/types"
import instance from "../instance"

export interface OrderChartDataRes {
    data:{
        _id:string,
        data:{
            amount:number,
            date:string,
        }[]
    }[]

}

export const FetchOrdersChartData = async(chartType:string)=>{
    return instance.get<ErrorResponse,OrderChartDataRes>(`/stats/orders?type=${chartType}`);
}
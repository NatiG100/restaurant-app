import { TypeCustomeErrorResponse, TypeMultiDataResponse } from "../types/types";
import instance from "./instance";

export const fetchAllOrders = async ()=>{
    return instance.get<
        TypeCustomeErrorResponse,
        TypeMultiDataResponse
    >(`/orders`,
    )
};

export interface TypeChangeOrderStatus{
    status:"Served"|"Pending"|"Cancelled"|"Started",
    id:string
}
export const changeOrderStatus = async(data:TypeChangeOrderStatus)=>{
    return instance.patch<
        TypeCustomeErrorResponse,
        TypeMultiDataResponse
    >(`/orders/${data.id}/change-status`,{status:data.status},
    );
};

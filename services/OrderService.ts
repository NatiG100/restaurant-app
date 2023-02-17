import { TypeCustomeErrorResponse, TypeMultiDataResponse } from "../types/types";
import instance from "./instance";

export const fetchAllOrders = async ()=>{
    return instance.get<
        TypeCustomeErrorResponse,
        TypeMultiDataResponse
    >(`/orders`)
};


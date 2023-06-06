import { TypeCustomeErrorResponse, TypeMultiDataResponse } from "../types/types";
import instance from "./instance";

export const fetchAllTables = async ()=>{
    return instance.get<
        TypeCustomeErrorResponse,
        TypeMultiDataResponse
    >(`/tables`,
    )
}

export interface TypeAddTable{
    tableNumber:string
}
export const addTable = async(data:TypeAddTable)=>{
    return instance.post<
        TypeCustomeErrorResponse,
        TypeMultiDataResponse
    >(`/tables`,data,
    );
}

//update food category service
export interface TypeUpdateTable{
    tableNumber:string,
    id:string
}
export const updateTable = async(data:TypeUpdateTable)=>{
    return instance.patch<
        TypeCustomeErrorResponse,
        TypeMultiDataResponse
    >(`/tables/${data.id}/update`,data,
    );
}

//change food status service
export interface TypeChangeTableStatus{
    status:"Active"|"Suspended",
    id:string
}
export const changeTableStatus = async(data:TypeChangeTableStatus)=>{
    return instance.patch<
        TypeCustomeErrorResponse,
        TypeMultiDataResponse
    >(`/tables/${data.id}/change-status`,{status:data.status},
    );
};

export const deleteTable = async(data:{id:string})=>{
    return instance.delete<
        TypeCustomeErrorResponse,
        TypeMultiDataResponse
    >(`tables/${data.id}`,
    );
}
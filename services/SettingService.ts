import { TypeCustomeErrorResponse, TypeMultiDataResponse } from "../types/types";
import instance from "./instance";
export interface TypeFetchSettingResponse{
    data:TypeUpdateSetting,
    message:string,
}
export const fetchSetting = async ()=>{
    return instance.get<
        TypeCustomeErrorResponse,
        TypeFetchSettingResponse
    >(`/setting`)
}
export interface TypeUpdateSetting{
    taxRate:number,
    frontendWebDomain:string,
}
export const updateSetting = async(data:TypeUpdateSetting)=>{
    console.log(data);
    return instance.patch<
        TypeCustomeErrorResponse,
        TypeMultiDataResponse
    >(`/setting`,data);
}
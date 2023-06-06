import { TypeCustomeErrorResponse, TypeMultiDataResponse } from "../types/types";
import instance from "./instance";

export const login = async (data:{email:string,password:string})=>{
    return instance.post<TypeCustomeErrorResponse,TypeMultiDataResponse>(
        'auth/login',
        data,
        {withCredentials:true,headers:{"Access-Control-Allow-Origin":"https://restaurant-app-api-kkdj.onrender.com"}},
    );
};

export const logout = async ()=>{
    return instance.post(
        'auth/logout',
        {withCredentials:true,}
    );
};
export const who_am_i = async()=>{
    return instance.get(
        'auth/who-am-i',
        {withCredentials:true}
    );
};

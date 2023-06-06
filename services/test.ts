import axios from "axios";
import baseURL from "../constants/BASE_URL";
import { TypeCustomeErrorResponse, TypeMultiDataResponse } from "../types/types"
import instance from "./instance"

export const test = async ()=>{
    return instance.post<
        TypeCustomeErrorResponse,
        TypeMultiDataResponse
    >(`/test`,{},);
}
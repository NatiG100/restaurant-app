import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { who_am_i } from "../../services/AuthService";
import {login as dispatchLogin} from './../../Context/AuthSlice';
import Loading from "../UIElements/Loading";
import { useRouter } from "next/router";
import { fetchSetting, TypeFetchSettingResponse } from "../../services/SettingService";
import { TypeCustomeErrorResponse } from "../../types/types";
import { toast } from "react-toastify";

export default function WhoAmI({children}:{children:React.ReactNode}){
    const {data,error} = useQuery('whoAmI',who_am_i);
    const [loading,setLoading] = useState(true);
    const dispatch = useDispatch();
    const router = useRouter();
    const {data:setting,error:settingError,isLoading} = useQuery<
      TypeFetchSettingResponse,
      TypeCustomeErrorResponse
    >('fetchApplicationSetting',fetchSetting);

    useEffect(()=>{
      if(settingError){
        toast(settingError.message,{type:"error"});
      }
      else if(setting){
        localStorage.setItem("frontendWebDomain",setting.data.frontendWebDomain);
      }
    },[setting,settingError]);
    useEffect(()=>{
        if(data?.data){
            dispatch(dispatchLogin(data?.data));
            setLoading(false);
        }
        if(error){
            router.replace("/login")
            setLoading(false);
        }
    },[error,data]);
    
    if(loading) return <Loading type="full"/>
    return(
        <>
            {children}
        </>
    );
}
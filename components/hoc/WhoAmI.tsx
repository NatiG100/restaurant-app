import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { who_am_i } from "../../services/AuthService";
import {login as dispatchLogin, logout as dispatchLogout} from './../../Context/AuthSlice';
import { toast } from "react-toastify";

export default function WhoAmI({children}:{children:React.ReactNode}){
    const {data,error} = useQuery('whoAmI',who_am_i);
    const [loading,setLoading] = useState(true);
    const dispatch = useDispatch();
    useEffect(()=>{
        if(error){
            toast(error?.message,{type:"error"})
        }
        if(data){
            dispatch(dispatchLogin(data?.data));
            setLoading(false);
        }
    },[error,data]);
    if(loading) return <p>loading</p>
    return(
        <>
            {children}
        </>
    );
}
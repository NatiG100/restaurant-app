import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { who_am_i } from "../../services/AuthService";
import {login as dispatchLogin} from './../../Context/AuthSlice';
import Loading from "../UIElements/Loading";
import { useRouter } from "next/router";

export default function WhoAmI({children}:{children:React.ReactNode}){
    const {data,error} = useQuery('whoAmI',who_am_i);
    const [loading,setLoading] = useState(true);
    const dispatch = useDispatch();
    const router = useRouter();
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
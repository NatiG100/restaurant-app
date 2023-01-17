import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Context/store";
import Loading from "../UIElements/Loading";

export default function RedirectToLogin({children}:{children:React.ReactNode}){
    const user = useSelector<RootState>(state=>state?.auth?.user);
    const [loading,setLoading] = useState(true);
    const router = useRouter();
    useEffect(()=>{
        if(user){
            setLoading(false);
        }if(!user){
            router.replace('/login');
        }
    },[user])
    if(loading) return<Loading type="full"/>
    return <>{children}</>;
}
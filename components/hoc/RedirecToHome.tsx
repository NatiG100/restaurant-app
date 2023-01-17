import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Context/store";

export default function RedirectToHome({children}:{children:React.ReactNode}){
    const user = useSelector<RootState>(state=>state?.auth?.user);
    const [loading,setLoading] = useState(true);
    const router = useRouter();
    useEffect(()=>{
        if(user){
            router.replace('/');
        }if(!user){
            setLoading(false);
        }
    },[user])
    if(loading) return<p>loading</p>
    return <>{children}</>;
}
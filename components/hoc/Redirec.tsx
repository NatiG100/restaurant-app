import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Context/store";
import Loading from "../UIElements/Loading";

export default function Redirect({children}:{children:React.ReactElement}){
    const router = useRouter();
    const user = useSelector<RootState>(state=>state?.auth?.user);
    const [loading, setLoading]= useState(true);
    useEffect(()=>{
        if(user){
            router.replace('/').then(()=>{
                setTimeout(()=>{
                    setLoading(false);
                },500);
            })
        }else if(!user){
            router.replace('/login').then(()=>{
                setTimeout(()=>{
                    setLoading(false);
                },500)
            })
        }
    },[user]);
    if(loading) return <Loading type="full"/>
    return children;
}
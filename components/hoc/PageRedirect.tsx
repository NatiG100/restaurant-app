import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { TypePermission } from "../../assets/permissions";
import { RootState } from "../../Context/store";
import { TypeUser } from "../TableComponents/user";
import {useEffect, useState} from 'react'
import Loading from "../UIElements/Loading";

export interface PageRedirectProps{
    children:React.ReactElement,
    requiredPrivilage:TypePermission
}
export default function PageRedirect({children,requiredPrivilage}:PageRedirectProps){
    const [loading,setLoading] = useState(true);
    const router = useRouter();
    const user:TypeUser = useSelector<RootState>((state)=>(state.auth?.user)) as TypeUser;
    useEffect(()=>{
        if(user){
            if(user.previlages.includes(requiredPrivilage)){
                setLoading(false);
            }else if(user.previlages.includes("View Info")){
                router.replace('/').then(()=>{
                    setTimeout(()=>{
                        setLoading(false);
                    },500);
                });
            }else{
                router.replace('/foods/categories').then(()=>{
                    setTimeout(()=>{
                        setLoading(false);
                    },500);
                });
            }
        }
    },[user]);
    if(loading) return <Loading type="full"/>
    return children
}
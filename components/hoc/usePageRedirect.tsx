import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { TypePermission } from "../../assets/permissions";
import { RootState } from "../../Context/store";
import { TypeUser } from "../TableComponents/user";
import {useEffect, useState} from 'react'

export default function usePageRedirect(requiredPrivilage:TypePermission){
    const [finished,setFinished] = useState(false);
    const router = useRouter();
    const user:TypeUser = useSelector<RootState>((state)=>(state.auth?.user)) as TypeUser;
    useEffect(()=>{
        if(user){
            if(user.previlages.includes(requiredPrivilage)){
                setFinished(true);
            }else if(user.previlages.includes("View Info")){
                router.replace('/').then(()=>{
                    setTimeout(()=>{
                        setFinished(true);
                    },500);
                });
            }else{
                router.replace('/foods/categories').then(()=>{
                    setTimeout(()=>{
                        setFinished(true);
                    },500);
                });
            }
        }
    },[user]);
    return finished
}
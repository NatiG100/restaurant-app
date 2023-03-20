import { useState,useEffect } from "react";
import { useSelector } from "react-redux"
import { TypePermission } from "../assets/permissions";
import { TypeUser } from "../components/TableComponents/user";
import { RootState } from "../Context/store"

export interface AuthProps{
    requiredPrevilage:TypePermission,
}
export default function useRequireauthorize({requiredPrevilage}:AuthProps){
    const user:TypeUser = useSelector<RootState>((state)=>(state?.auth.user)) as TypeUser;
    const [isAuthorized,setAuthorized] = useState(false);
    useEffect(()=>{
        if(user){
            setAuthorized(
                user?.previlages.includes(requiredPrevilage)
            );
        }
    },[user])
    return isAuthorized;
}
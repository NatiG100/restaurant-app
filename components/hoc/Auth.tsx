import { ReactNode } from "react";
import { useSelector } from "react-redux"
import { TypePermission } from "../../assets/permissions";
import { RootState } from "../../Context/store"
import { TypeUser } from "../TableComponents/user"

export interface AuthProps{
    requiredPrevilage:TypePermission,
    children:ReactNode,
}
export default function Auth({requiredPrevilage,children}:AuthProps){
    const user:TypeUser = useSelector<RootState>((state)=>(state?.auth.user)) as TypeUser;
    if(user.previlages.includes(requiredPrevilage))return children
    return null;
}
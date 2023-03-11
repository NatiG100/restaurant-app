import Image from "next/image";
import { ReactElement, useEffect } from "react";
import avatar from '../../public/Haile_Selassie_in_full_dress_(cropped).jpg'

import {IoNotificationsSharp as NotificationIcon} from 'react-icons/io5';
import {RiMessage2Fill as MessageIcon} from 'react-icons/ri';
import Button from "../UIElements/Button";
import { useMutation } from "react-query";
import { logout } from "../../services/AuthService";
import {logout as dispatchLogout} from '../../Context/AuthSlice';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Context/store";

interface AppbarInterface {
    component?: ReactElement,
}


export default function Appbar({component} : AppbarInterface){
    const dispatch = useDispatch();
    const {error,data,mutate:requestLogout} = useMutation(logout);
    const user = useSelector<RootState>(state=>state?.auth?.user);
    useEffect(()=>{
        if(data||error){
            dispatch(dispatchLogout());
        }
    },[data,error])
    return(
        <div className="h-20 bg-white w-full border-b border-slate-300 flex justify-between items-center px-8">
            {component}
            <div className="flex items-center justify-between gap-6">
                <Button
                    type="outline"
                    color="error"
                    onClick={()=>{
                        requestLogout();
                    }}
                >
                    Logout
                </Button>
                <MessageIcon className="text-2xl text-indigo-500"/>
                <NotificationIcon className="text-2xl text-indigo-500"/>
                <div className="h-max w-max relative">
                    <Image 
                        alt="avater" 
                        src={avatar} 
                        className="w-14 h-14 rounded-full object-cover"
                    />
                    <div >

                    </div>
                </div>
            </div>
        </div>
    );
}
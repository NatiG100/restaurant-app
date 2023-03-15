import Image from "next/image";
import { ReactElement, useEffect,useState,useRef} from "react";
import avatar from '../../public/Haile_Selassie_in_full_dress_(cropped).jpg'

import {IoNotificationsSharp as NotificationIcon} from 'react-icons/io5';
import {RiMessage2Fill as MessageIcon} from 'react-icons/ri';
import Button from "../UIElements/Button";
import { useMutation } from "react-query";
import { logout } from "../../services/AuthService";
import {logout as dispatchLogout} from '../../Context/AuthSlice';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Context/store";
import { useOutsideClickListner } from "../../hooks/useOutsideClickListner";
import IconButton from "../UIElements/IconButton";
import {FaEdit as EditIcon,FaSignOutAlt as LogoutIcon} from 'react-icons/fa'
import useAnimateOnWillUnmout from "../../hooks/useAnimateOnWillUnmout";
import baseURL from "../../constants/BASE_URL";
import Backdrop from "../Backdrop";
import ConfirmationBox from "../DialogBox/ConfirmationBox";

interface AppbarInterface {
    component?: ReactElement,
}


export default function Appbar({component} : AppbarInterface){
    const dispatch = useDispatch();
    const {error,data,mutate:requestLogout} = useMutation(logout);
    const user:any = useSelector<RootState>(state=>state?.auth?.user);
    useEffect(()=>{
        if(data||error){
            dispatch(dispatchLogout());
        }
    },[data,error]);
    const avatarRef = useRef(null);
    const imageRef = useRef(null);
    const clickedOutside = useOutsideClickListner(avatarRef,[imageRef]);
    const {onAnimationEnd,shouldRender,show} = useAnimateOnWillUnmout(false,!clickedOutside);
    const [openLogoutDialogB, setOpenLogoutDialogB] = useState(false);
    const handleOpen = ()=>{
        setOpenLogoutDialogB(true);
    }
    const handleClose = ()=>{
        setOpenLogoutDialogB(false);
    }
    const handleConfirm = (confirmed:boolean)=>{
        if(confirmed){
            requestLogout();
        }else{
            handleClose();
        }
    }
    return(
        <div className="h-20 bg-white w-full border-b border-slate-300 flex justify-between items-center px-8">
            {component}
            <div className="flex items-center justify-between gap-6">
                {openLogoutDialogB&&<Backdrop onClick={handleClose}>
                    <ConfirmationBox
                        title="Confirm Logout"
                        prompt="Are you sure you want to logout?"
                        callBack={handleConfirm}
                    />
                </Backdrop>}
                <NotificationIcon className="text-2xl text-indigo-500"/>
                <div className="h-14 w-14 relative" ref={avatarRef} >
                    <Image
                        ref={imageRef}
                        alt="avater" 
                        src={user?.img?baseURL+user.img:""}
                        width={400}
                        height={400}
                        className="absolute t-0 l-0 h-full w-full rounded-full object-cover cursor-pointer"
                    />
                    {shouldRender&&<div onAnimationEnd={onAnimationEnd} className=
                        {`absolute top-full right-0
                        bg-gray-50 rounded-lg shadow-sm p-3 py-4
                        z-50 border border-gray-300 ${show?'animate-zoom-fade-in':'animate-zood-fade-out'}`}
                    >
                        <div className="bg-gray-100 rounded-md p-2 px-3 mb-2 border border-gray-2000">
                            <p className="
                                text-gray-600 font-semibold text-lg whitespace-nowrap
                            ">{user?.fullName}</p>
                            <p className="1
                                text-gray-600
                            ">{user?.email}</p>
                        </div>
                        <IconButton
                            size="smd"
                            type="outline"
                            color="primary"
                            className="rounded-sm w-full justify-start"
                            iconStart={<EditIcon/>}
                        >
                            Edit Profile
                        </IconButton>
                        <IconButton
                            size="smd"
                            type="fill"
                            color="error"
                            className="rounded-sm w-full"
                            onClick={handleOpen}
                            iconStart={<LogoutIcon/>}
                        >
                            Logout
                        </IconButton>
                    </div>}
                </div>
            </div>
        </div>
    );
}
import Image from "next/image";
import { ReactElement } from "react";
import avatar from '../../public/Haile_Selassie_in_full_dress_(cropped).jpg'

import {IoNotificationsSharp as NotificationIcon} from 'react-icons/io5';
import {RiMessage2Fill as MessageIcon} from 'react-icons/ri';

interface AppbarInterface {
    component?: ReactElement,
}

export default function Appbar({component} : AppbarInterface){
    return(
        <div className="h-20 bg-white w-full border-b border-slate-300 flex justify-between items-center px-8">
            {component}
            <div className="flex items-center justify-between gap-6">
                <MessageIcon className="text-2xl text-indigo-500"/>
                <NotificationIcon className="text-2xl text-indigo-500"/>
                <Image alt="avater" src={avatar} className="w-14 h-14 rounded-full object-cover"/>
            </div>
        </div>
    );
}
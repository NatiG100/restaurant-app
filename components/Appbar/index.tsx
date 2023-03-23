import Image from "next/image";
import { ReactElement} from "react";

import Notification from "./Notificatin";
import UserProfile from "./UserProfile";

interface AppbarInterface {
    component?: ReactElement,
}


export default function Appbar({component} : AppbarInterface){
    return(
        <div className="h-20 bg-white w-full border-b border-slate-300 flex justify-between items-center px-8">
            {component}
            <div className="flex items-center justify-between gap-6">
                <Notification/>
                <UserProfile/>
            </div>
        </div>
    );
}
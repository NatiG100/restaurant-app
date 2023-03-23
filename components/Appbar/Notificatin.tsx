import { useEffect, useRef,useState } from "react";
import useAnimateOnWillUnmount from "../../hooks/useAnimateOnWillUnmount";
import { useOutsideClickListner } from "../../hooks/useOutsideClickListner";
import IconButton from "../UIElements/IconButton";
import {IoNotificationsSharp as NotificationIcon} from 'react-icons/io5';
import { socket } from "../../utils/socket";


export default function Notification (){
    const notificationRef = useRef(null);
    const notificationButtonRef = useRef(null);
    const clickedOutsideNotificationButton = useOutsideClickListner(notificationRef,[notificationButtonRef]);
    const {
        onAnimationEnd:onNotificationAnimationEnd,
        shouldRender:shouldRenderNotifications
        ,show:showNotification
    } = useAnimateOnWillUnmount(false,!clickedOutsideNotificationButton);

    //state to track whether there are new notifications or not
    const [seen,setSeen] = useState(false);
    //subscribe to order notification on componentDidMount
    useEffect(()=>{
        function onEvent(data:any){
            //when a new notification arrifes set seen false
            setSeen(false);
            console.log(data);
        }
        function onConnect(){
            console.log("connected")
        }
        socket.on('notification',onEvent);
        socket.on('connect',onConnect)
        return()=>{
            socket.off("notification",onEvent);
            socket.off("event",onConnect)
        }
    },[]);
    useEffect(()=>{
        if(shouldRenderNotifications){
            setSeen(true);
        }
    },[shouldRenderNotifications])

    return(
        <div className="relative" ref={notificationRef}>
            {!seen&&<div className="absolute top-2 right-2 h-2 w-2 bg-red-400 rounded-full"></div>}
            <IconButton
                iconStart={<NotificationIcon className="text-2xl text-indigo-500"/>}
                type="text"
                className="rounded-full p-2 focus:shadow-none"
                ref={notificationButtonRef}
            > </IconButton>
            {shouldRenderNotifications&&<div onAnimationEnd={onNotificationAnimationEnd} className=
                {`absolute top-full right-0
                bg-gray-50 rounded-lg shadow-sm p-3 py-4 gap-4
                z-40 border border-gray-300 ${showNotification?'animate-zoom-fade-in':'animate-zood-fade-out'}`}
            >
                <SingleNotification title="New Order" description="a new order has arrived from a client" seen={false}/>
                <SingleNotification title="New Order" description="a new order has arrived from a client" seen={false}/>
                <SingleNotification title="New Order" description="a new order has arrived from a client" seen={true}/>
            </div>}
        </div>
    );
};

export interface SingleNotificationProps{
    title:string,
    description:string,
    seen:boolean,
}
function SingleNotification({title,description,seen}:SingleNotificationProps){
    return(
        <div className={`
            grid grid-cols-mx1fr  p-2 py-1 cursor-default
            gap-7 items-center rounded-sm ${!seen&&"bg-indigo-400/5"}
        `}>
            <div className="
                w-48 flex flex-col
            ">
                <p className="font-semibold text-sm text-gray-800">{title}</p>
                <p className="text-sm text-gray-600">{description}</p>
            </div>
            {!seen&&<div className="h-2 w-2 rounded-full bg-red-300"></div>}
        </div>
    );
}
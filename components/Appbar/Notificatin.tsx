import { useEffect, useRef } from "react";
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
    useEffect(()=>{
        function onEvent(data:any){
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
    return(
        <div className="relative" ref={notificationRef}>
            <IconButton
                iconStart={<NotificationIcon className="text-2xl text-indigo-500"/>}
                type="text"
                className="rounded-full p-2 focus:shadow-none"
                ref={notificationButtonRef}
            > </IconButton>
            {shouldRenderNotifications&&<div onAnimationEnd={onNotificationAnimationEnd} className=
                {`absolute top-full right-0
                bg-gray-50 rounded-lg shadow-sm p-3 py-4
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
        <div className="
            grid grid-cols-mx1fr
        ">
            <div className="
                w-40 flex flex-col
            ">
                <p>{title}</p>
                <p>{description}</p>
            </div>
            {!seen&&<div className="h-4 w-4 rounded-full bg-red-600"></div>}
        </div>
    );
}
import { useEffect, useRef,useState } from "react";
import useAnimateOnWillUnmount from "../../hooks/useAnimateOnWillUnmount";
import { useOutsideClickListner } from "../../hooks/useOutsideClickListner";
import IconButton from "../UIElements/IconButton";
import {IoNotificationsSharp as NotificationIcon} from 'react-icons/io5';
import { socket } from "../../utils/socket";
import { useMutation, useQuery } from "react-query";
import { fetchAllNotifications, FetchNotificationError, FetchNotificationsSuccess, seeAllNotifications } from "../../services/NotificationServices";
import Loading from "../UIElements/Loading";

type TypeNotification = {
    title:string,
    description:string,
    seen:boolean,
    _id:string
}

export default function Notification (){
    const {
        data:notifications,
        error:notificationError,
        refetch:refetchNotifications,
        isLoading:notificationsLoading,
    } = useQuery<FetchNotificationsSuccess,FetchNotificationError>('fetchNotifications',fetchAllNotifications);


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
        socket.on('notification',onEvent);
        return()=>{socket.off("notification",onEvent);}
    },[]);

    //make all notifications seen when the user opens the notification list
    const {mutate} = useMutation(seeAllNotifications);
    useEffect(()=>{
        if(shouldRenderNotifications){
            mutate();
        }else{
            refetchNotifications();
        }
    },[shouldRenderNotifications]);

    useEffect(()=>{
        if(notifications?.data){
            let tempSeen = true;
            notifications.data.map((notification)=>{
                if(!notification.seen){
                    tempSeen = false;
                }
            });
            setSeen(tempSeen);
        }
    },[notifications]);

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
                bg-gray-50 rounded-lg shadow-sm p-3 py-4 gap-2
                z-40 border border-gray-300 ${showNotification?'animate-zoom-fade-in':'animate-zood-fade-out'}
                    max-h-80 overflow-x-auto scrollbar-hide flex flex-col shadow-lg
                `}
            >
                {notificationsLoading?<Loading type="contained"/>:
                    notifications?.data.map((notification)=>(
                        <SingleNotification 
                            title={notification.title}
                            description={notification.description} 
                            seen={notification.seen}
                            key={notification._id}
                        />
                    ))
                }
                {
                    notificationError&&<p className="text-red-500 text-sm w-40">Error while trying to load notifications</p>
                }
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
            grid grid-cols-mx1fr  p-3 py-2 cursor-default
            gap-7 items-center rounded-lg ${seen?"bg-gray-400/5":"bg-indigo-400/5"}
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
import instance from "./instance"

export interface FetchNotificationsSuccess{
    data:[{title:string,description:string,seen:boolean,_id:string}]
}
export interface FetchNotificationError{
    message:string,
}
export const fetchAllNotifications = async()=>{
    return instance.get<FetchNotificationError,FetchNotificationsSuccess>('/notifications',{withCredentials:true});
}

export const seeAllNotifications = async()=>{
    return instance.post<{message:string},{message:string}>('/notifications/see',
    {withCredentials:true});
}
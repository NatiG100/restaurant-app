import { useEffect, useState } from "react";

export default function useTimeCounter(startTimeInSec:number=0,shouldCount=false){
    const [time,setTime] = useState<number>(startTimeInSec)
    const [minutes,setMinutes] = useState<number>(Math.floor(time/60));
    const [secs,setSecs] = useState<number>(time%60);

    useEffect(()=>{
        if(shouldCount){
            let timeoutId:any = null;
            const increment = ()=>{
                timeoutId = setTimeout(()=>{
                    setTime((oldTime)=>(oldTime+1));
                    increment();
                },1000);    
            };
            increment();
            return ()=>{clearTimeout(timeoutId)};
        }
    },[]);
    useEffect(()=>{
        setMinutes(Math.floor(time/60));
        setSecs(time%60);
    },[time]);
    return{
        time,
        minutes,
        secs
    }
}
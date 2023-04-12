import {useState} from 'react';

export interface ToggleBtnProps{
    disabled?:boolean,
    isOn:boolean,
    setIsOn:(callback:(prev:boolean)=>boolean)=>void
}

export default function ToggleBtn({disabled=false,isOn=false,setIsOn}:ToggleBtnProps){
    const toggle = ()=>{
        if(!disabled){
            setIsOn((prev)=>(!prev));
        }
    }
    return(
        <div 
            onClick={toggle}
            className={`
            relative w-[32px] h-[16px] rounded-full ${isOn?"bg-indigo-500":"bg-slate-200 border"}
            cursor-pointer ${disabled&&"opacity-60"}
        `}>
            <div className={`
                absolute ${isOn?"right-0 top-[-1px]":"left-0 top-[-2px]"}  h-[18px] w-[18px] rounded-full ${isOn?"border-indigo-300":"border-slate-300"} bg-white shadow-sm
                border border-slate-300
            `}></div>
        </div>
    )
}
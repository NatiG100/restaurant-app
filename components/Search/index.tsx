import React, { useEffect, useRef, useState } from "react";
import {HiOutlineMagnifyingGlass as SearchIcon} from 'react-icons/hi2';

export const enum SearchSize {
    sm,
    md,
    lg,
    full,
}
interface SearchParam {
    size?: SearchSize,
    onChange: (event: React.ChangeEvent<HTMLInputElement>)=>void,
    value: string
}
export default function Search({size=SearchSize.lg ,onChange,value} : SearchParam){
    const [isFocus, setisfocus] = useState<boolean>(true);
    const ref = useRef<HTMLInputElement>(null);
    useEffect(()=>{
        if(ref.current){
            setisfocus(ref.current===document.activeElement);
        }
    },[])
    const handleFocus = ()=>{
        setisfocus(true);
    }
    const handleBlur = ()=>{
        setisfocus(false);
    }
    return(
        <div className="h-10 grid grid-cols-mx1fr items-center relative">
            <SearchIcon 
                size={37} className={`pointer-events-none p-2 absolute t-0 r-0 z-10 ${isFocus?"text-indigo-600":"text-indigo-400"} stroke-2`}
            />
            <input 
                className={`
                    focus:outline-0 focus:ring-0
                    bg-transparent absolute t-0 r-0 h-full text-lg pl-9
                    ${size===SearchSize.full?"w-full":size===SearchSize.lg?"w-96":size===SearchSize.md?"w-80":"w-64"}
                    bg-slate-50 border-indigo-400 border focus:border-indigo-600 
                    focus:bg-slate-100 rounded text-slate-500 focus:text-slate-800 font-normal
                `} 
                placeholder="Search"
                onFocus={handleFocus}
                onBlur={handleBlur}
                ref={ref}
                onChange={onChange}
                value={value}
            />
        </div>
    );
}
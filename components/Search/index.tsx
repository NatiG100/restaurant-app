import React, { useEffect, useRef, useState } from "react";
import {HiOutlineMagnifyingGlass as SearchIcon} from 'react-icons/hi2';

export const enum SearchSize {
    sm=64,
    md=80,
    lg=96,
    full=100
}
interface SearchParam {
    size?: SearchSize,
    onChange: (event: React.ChangeEvent<HTMLInputElement>)=>void,
    value: String
}
export default function Search({size=SearchSize.lg ,onChange} : SearchParam){
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
    const handleClick = ()=>{
        ref.current?.focus();
    }
    return(
        <div className="h-10 grid grid-cols-mx1fr items-center relative">
            <SearchIcon 
                size={37} className={`pointer-events-none p-2 absolute t-0 r-0 z-10 ${isFocus?"text-indigo-600":"text-indigo-400"} stroke-2`}
            />
            <input 
                className={`bg-transparent absolute t-0 r-0 outline-0 h-full w-full text-lg pl-9
                    w-${size===SearchSize.full?"full":size} 
                    bg-slate-50 border-indigo-400 border focus:border-indigo-600 focus:bg-slate-100
                    rounded text-slate-500 focus:text-slate-800 font-normal`} 
                placeholder="Search"
                onFocus={handleFocus}
                onBlur={handleBlur}
                ref={ref}
            />
        </div>
    );
}
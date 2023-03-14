import Image from "next/image";
import {StaticImageData} from 'next/image';
import React, { useEffect, useState } from "react";

export interface SalesItemInterface {
    img:string | StaticImageData,
    name:string,
    amount:number
}
export default function SalesItem(props:SalesItemInterface){
    const [hover,setHover] = useState<boolean>(false);
    const [shouldRender,setShouldRender] = useState(false);
    useEffect(()=>{
        if(hover){
            setShouldRender(true);
        }
    },[hover]);
    const onAnimationEnd=()=>{
        if(!hover) setShouldRender(false); 
    }
    const handleMouseEnter = ()=>{
        setHover(true);
    }
    const handleMouseLeave = ()=>{
        setHover(false);
    }
    return(
        <div 
            className="w-28 h-28 rounded-xl p-4 relative overflow-hidden cursor-pointer shrink-0"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Image 
                src={props.img} 
                alt={props.name}
                className="absolute top-0 left-0 h-full w-full object-cover"
            />
            {
                shouldRender&&<div onAnimationEnd={onAnimationEnd} className={`
                    absolute top-0 left-0 h-full w-full 
                    flex items-center flex-col justify-center
                    bg-indigo-800/75 ${hover?"animate-appear":"animate-disappear"}
                `}>
                    <p className="text-md text-white text-center ">{props.name}</p>
                    <p className="text-2xl font-bold text-white">{props.amount}</p>
                </div>
            }
            
        </div>
    );
}
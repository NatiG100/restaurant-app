import Image from "next/image";
import {StaticImageData} from 'next/image';
import React, { useState } from "react";

export interface SalesItemInterface {
    img:string | StaticImageData,
    name:string,
    amount:number
}
export default function SalesItem(props:SalesItemInterface){
    const [hover,setHover] = useState<boolean>(false);
    const handleMouseEnter = ()=>{
        setHover(true);
    }
    const handleMouseLeave = ()=>{
        setHover(false);
    }
    return(
        <div 
            className="w-32 h-32 rounded-xl p-4 relative overflow-hidden cursor-pointer shrink-0"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Image 
                src={props.img} 
                alt={props.name}
                className="absolute top-0 left-0 h-full w-full object-cover"
            />
            {
                hover&&<div className="
                    absolute top-0 left-0 h-full w-full 
                    flex items-center flex-col justify-center
                    bg-indigo-800/75 animate-appear
                ">
                    <p className="text-xl text-white text-center font-semibold">{props.name}</p>
                    <p className="text-4xl font-bold text-white">{props.amount}</p>
                </div>
            }
            
        </div>
    );
}
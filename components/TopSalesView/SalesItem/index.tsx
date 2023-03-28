import Image from "next/image";
import {StaticImageData} from 'next/image';
import React, { useEffect, useState } from "react";
import baseURL from "../../../constants/BASE_URL";
import useAnimateOnWillUnmount from "../../../hooks/useAnimateOnWillUnmount";

export interface SalesItemInterface {
    img:string | StaticImageData,
    name:string,
    amount:number
}
export default function SalesItem(props:SalesItemInterface){
    const {show,shouldRender,onAnimationEnd,triggerRemove,triggerRender} = useAnimateOnWillUnmount(false);
    return(
        <div 
            className="w-28 h-28 rounded-xl p-4 relative overflow-hidden cursor-pointer shrink-0"
            onMouseEnter={triggerRender}
            onMouseLeave={triggerRemove}
        >
            <Image 
                height={500}
                width={500}
                src={baseURL+props.img} 
                alt={props.name}
                className="absolute top-0 left-0 h-full w-full object-cover"
            />
            {
                shouldRender&&<div onAnimationEnd={onAnimationEnd} className={`
                    absolute top-0 left-0 h-full w-full 
                    flex items-center flex-col justify-center
                    bg-indigo-800/75 ${show?"animate-appear":"animate-disappear"}
                `}>
                    <p className="text-md text-white text-center ">{props.name}</p>
                    <p className="text-2xl font-bold text-white">{props.amount}</p>
                </div>
            }
            
        </div>
    );
}
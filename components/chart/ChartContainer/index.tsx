import Image from "next/image";
import { ChangeEvent } from "react";
import loading from './../../../assets/svg/Loading.svg';

interface ChartContainerInterface {
    title: string,
    hasFilter: boolean,
    filterItems: {key:number, text:string}[],
    children: React.ReactNode,
    selected: number
    onChange(event:ChangeEvent<HTMLSelectElement>):void,
    loading: boolean,
    span: number,
}

export default function ChartContainer(props:ChartContainerInterface){
    return(
        <div className={`
            p-5 rounded-lg bg-white grid grid-rows-header w-full h-full max-h-full
            shadow-sm gap-y-4 relative overflow-hidden
            col-span-2 md:col-span-${props.span} border border-indigo-100
        `}>
            <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="rounded-tl-md rounded-bl-md w-4 h-8 bg-gray-200"></div>
                    <p className="text-gray-700 font-semibold">{props.title}</p>
                </div>
                <select 
                    className="
                        focus:outline-none border border-indigo-400 p-2 bg-indigo-50
                        rounded-md text-indigo-600 focus:ring-1 ring-indigo-500
                    " 
                    value={props.selected}
                    onChange={props.onChange}
                >
                    {props.filterItems.map((item)=>(
                            <option 
                                key={item.key} 
                                className="text-lg text-indigo-700 active:bg-indigo-700" 
                                value={item.key}
                            >
                                {item.text}
                            </option>
                        ))
                    }
                </select>
            </div>
            <div className="h-full w-full">
                {props.children}
            </div>
            {props.loading&&<div className="
                absolute top-0 left-0 right-0 bottom-0
                w-full h-full bg-indigo-500/50
                flex items-center justify-center
                backdrop-blur-sm
            ">
                <Image 
                    src={loading} 
                    alt="loading" 
                    className="fill-transparent h-10 w-10"
                />
            </div>}
        </div>
    );
}
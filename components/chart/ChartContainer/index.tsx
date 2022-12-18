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
            p-5 rounded-lg bg-white grid grid-rows-header w-full 
            shadow-custom-lg gap-y-4 relative overflow-hidden
            col-span-${props.span}
        `}>
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
            <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="rounded-tl-md rounded-bl-md w-4 h-8 bg-indigo-200"></div>
                    <p className="text-gray-800 font-bold text-lg">Sales</p>
                </div>
                <select 
                    className="focus:outline-none border border-gray-400 p-1 rounded-md text-gray-400" 
                    value={props.selected}
                    onChange={props.onChange}
                >
                    {props.filterItems.map((item)=>(
                            <option 
                                key={item.key} 
                                className="text-lg" 
                                value={item.key} 
                                selected={item.key === props.selected}
                            >
                                {item.text}
                            </option>
                        ))
                    }
                </select>
            </div>
            {props.children}
        </div>
    );
}
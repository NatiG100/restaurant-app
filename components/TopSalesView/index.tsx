import { StaticImageData } from "next/image";
import SalesItem, { SalesItemInterface } from "./SalesItem";
import {MdCircle as CircleIcon} from 'react-icons/md'


export default function TopSalesView(props:{items:SalesItemInterface[],title:string}){
    return(
        <div className="
            w-full h-full grid grid-rows-header
            bg-white shadow-sm pt-4 p-6
        ">
            <div className="pb-2 flex items-center justify-start gap-3">
                <CircleIcon className="text-indigo-200 text-md"/>
                <p className="text-lg font-bold text-indigo-900">{props.title}</p>
            </div>
            <div className="
                w-full h-full flex justify-start 
                items-center 
                gap-6 overflow-x-auto overflow-y-hidden
            ">
                {
                    props.items.map((item)=>(
                        <SalesItem 
                            amount={item.amount}
                            img={item.img}
                            name={item.name}
                            key={item.name}
                        />
                    ))
                }
            </div>
        </div>
    )
}
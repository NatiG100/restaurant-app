import { StaticImageData } from "next/image";
import SalesItem, { SalesItemInterface } from "./SalesItem";


export default function TopSalesView(props:{items:SalesItemInterface[]}){
    return(
        <div className="
            w-full h-full p-8 flex justify-start 
            items-center bg-white shadow-sm 
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
    )
}
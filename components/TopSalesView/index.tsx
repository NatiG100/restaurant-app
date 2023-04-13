import { StaticImageData } from "next/image";
import SalesItem, { SalesItemInterface } from "./SalesItem";
import {MdCircle as CircleIcon} from 'react-icons/md';
import {FaChevronLeft,FaChevronRight} from 'react-icons/fa'
import useScroll from '../../hooks/useScroll';
import {useRef} from 'react'


export default function TopSalesView(props:{items:SalesItemInterface[],title:string,setOption:(howMany:3|5|10)=>void,value:3|5|10}){
    const ref = useRef(null);
    const {end,start,moveLeft,moveRight} = useScroll({ref:ref,amount:props.value&&100})
    const onSelectChange = (event:React.ChangeEvent<HTMLSelectElement>) =>{
        props.setOption(Number.parseInt(event.target.value) as 3|5|10);
    }
    return(
        <div className="
            w-full h-full grid grid-rows-header
            bg-white shadow-sm pt-4 p-6
        ">
            <div className="pb-2 flex items-center justify-start gap-3">
                <CircleIcon className="text-gray-200 text-md"/>
                <p className="font-semibold text-gray-700">Top</p> 
                <select 
                    className="focus:outline-none border p-1 rounded-md text-gray-800" 
                    value={props.value}
                    onChange={onSelectChange}
                >
                    <option 
                        value={3}
                    >
                        3
                    </option>
                    <option 
                        value={5}
                    >
                        5
                    </option>
                    <option 
                        value={10}
                    >
                        10
                    </option>
                </select>
                <p className="font-semibold text-gray-700">{props.title}</p>
            </div>
            <div className="
                w-full h-full relative
            ">
                {!start&&<ScrollerButton direction="left" onClick={moveRight}/>}
                <div ref={ref} className="
                    w-full h-full overflow-x-auto 
                     flex justify-start 
                    items-center scrollbar-hide
                    gap-3 absolute left-0 right-0 top-0 bottom-0
                ">
                    {
                        props.items.map((item)=>(
                            <SalesItem 
                                amount={item.amount}
                                img={item.img}
                                name={item.name}
                                key={item.name}
                                total={item.total}
                            />
                        ))
                    }
                </div>
                {!end&&<ScrollerButton direction="right" onClick={moveLeft}/>}
            </div>
        </div>
    )
}
function ScrollerButton({direction,onClick=()=>{}}:{direction:"left"|"right",onClick?:()=>void}){
    return(
        <div 
            className={`
                ${direction==="left"?"bg-gradient-to-r":"bg-gradient-to-l"} from-white via-white to-transparent from-90% to-10%
                 z-40 absolute text-gray-500 hover:text-gray-900
                h-full px-4 flex items-center w-max 
                ${direction==="left"?"left-0":"right-0"} cursor-pointer
            `} 
            onClick={onClick}
        >
            {direction==="left"?<FaChevronLeft />:<FaChevronRight />}
        </div>
    )
}
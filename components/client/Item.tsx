import Image from "next/image";
import useQuantitySelect from "../../hooks/useQuantitySelect";
import {AiFillPlusCircle as PlusIcon,AiFillMinusCircle as MinusIcon} from 'react-icons/ai'

export interface TypeItem{
    name:string,
    img:string,
    description:string,
    cost:number,
    id:string,
    type:"food"|"drink",
    showDetai?:boolean,
    onClick:(id:string)=>void
}
export default function Item({
    img,
    name,
    description,
    cost,
    id,
    type,
    showDetai=false,
    onClick=(id:string)=>{}
}:TypeItem){



    const handleClick = ()=>{
        if(showDetai){
            onClick("");
        }else{
            onClick(id);
        }
    }

    //quantity in cart
    const {
        increment,
        decrement,
        canDecrese,
        canIncrese,
        quantity
    } = useQuantitySelect(10,0);
    return(
        <div
            className="
                h-max w-full overflow-hidden
                border border-black/10 rounded-xl max-w-xs mx-auto my-4 
            "
            onClick={handleClick}
        >
            <div className="
                h-max flex justify-between items-center p-3 py-4
                
            ">
                <Image
                    src={img}
                    alt={"title"}
                    height={60}
                    width={60}
                    className="rounded-full h-16 w-16 object-cover"
                />
                <div className="w-full ml-3">
                    <div style={{maxWidth:"220px"}}>
                        <p className="text-indigo-700 text-lg">{name}</p>
                        <p className="font-medium text-lg text-gray-600">
                            {cost+" ETB"}
                        </p>
                    </div>
                </div>
                <div className="flex items-center justify-between mr-2 h-12 w-60" onClick={(e)=>{e.stopPropagation()}}>
                    <button
                        onClick={decrement}
                        disabled={!canDecrese}
                        className={'text-gray-400 disabled:text-gray-300 text-3xl'}
                    ><MinusIcon/></button>
                    <p>{quantity}</p>
                    <button
                        onClick={increment}
                        disabled={!canIncrese}
                        className={'text-gray-400 disabled:text-gray-300 text-3xl'}
                    ><PlusIcon/></button>
                </div>
            </div>
            {
                showDetai&&
                <div className="p-3 bg-gray-100">
                    <p className="text-gray-800">Description</p>
                    <p className="text-sm text-gray-500">{description}</p>
                </div>
            }
        </div>
    );
}
import Image from "next/image";
import useQuantitySelect from "../../hooks/useQuantitySelect";
import {AiFillPlusCircle as PlusIcon,AiFillMinusCircle as MinusIcon} from 'react-icons/ai'
import {FaShoppingCart as CartIcon} from 'react-icons/fa';
import { useDispatch } from "react-redux";
import { addItem, CartSliceType, subtractItem } from "../../Context/CartSlice";
import React, { useCallback, useEffect, useRef } from "react";

export interface TypeItem{
    name:string,
    img:string,
    description:string,
    cost:number,
    id:string,
    type:"food"|"drink",
    showDetai?:boolean,
    onClick:(id:string)=>void,
    cart:CartSliceType,
    showCartIcon?:boolean
}
function Item({
    img,
    name,
    description,
    cost,
    id,
    type,
    showDetai=false,
    onClick=(id:string)=>{},
    cart,
    showCartIcon=true
}:TypeItem){

    const handleClick = ()=>{
        if(showDetai){
            onClick("");
        }else{
            onClick(id);
        }
    }

    const dispatch = useDispatch();

    //quantity in cart
    const handleAdd = useCallback(()=>{
        dispatch(addItem({
            cost,
            description,
            id,
            img,
            name,
            type
        }));
    },[cost,description,id,img,name,type]);
    const handleSubtract = useCallback(()=>{
        dispatch(subtractItem(id));
    },[id])
    const {
        increment,
        decrement,
        canDecrese,
        canIncrese,
        quantity,
        changeQt
    } = useQuantitySelect(10,0,handleAdd,handleSubtract);
    const qttLoaded = useRef<boolean>(false);
    useEffect(()=>{
        if(cart&&(!qttLoaded.current)){
            cart.items.forEach((item)=>{
                if(item.item.id===id){
                    changeQt(item.count);
                }
            });
            qttLoaded.current = true;
        }
    },[cart]);
    return(
        <div
            className="
                h-max w-full relative
                border border-black/10 rounded-xl max-w-xs mx-auto my-4 
            "
            onClick={handleClick}
        >
            {quantity>0&&showCartIcon&&
                <div className="
                    absolute -right-2 -top-2 h-7 w-7 rounded-full 
                    bg-yellow-500 flex items-center justify-center
                    animate-appear
                "
                >
                    <CartIcon className="text-white text-sm"/>
                </div>
            }
            <div className="
                h-max flex justify-between items-center p-3 py-4
                
            ">
                <Image
                    src={img}
                    alt={"title"}
                    height={400}
                    width={400}
                    className="rounded-full h-16 w-16 object-cover shrink-0"
                />
                <div className="w-full ml-3">
                    <div style={{maxWidth:"220px"}}>
                        <p className="text-indigo-700 text-lg">{name}</p>
                        <p className="font-medium text-lg text-gray-600">
                            {cost+" ETB"}
                        </p>
                    </div>
                </div>
                <div className="flex items-center justify-between mr-2 h-12 w-20 shrink-0" onClick={(e)=>{e.stopPropagation()}}>
                    <button
                        onClick={decrement}
                        disabled={!canDecrese}
                        className={'text-gray-400 disabled:text-gray-300 text-2xl'}
                    ><MinusIcon/></button>
                    <p>{quantity}</p>
                    <button
                        onClick={increment}
                        disabled={!canIncrese}
                        className={'text-gray-400 disabled:text-gray-300 text-2xl'}
                    ><PlusIcon/></button>
                </div>
            </div>
            
            <div className={`bg-gray-100 rounded-b-xl px-3 ${showDetai?"py-3":"h-0 overflow-hidden opacity-0"} transition-all`}>
                <p className="text-gray-800">Description</p>
                <p className="text-sm text-gray-500">{description}</p>
            </div>

        </div>
    );
};

export default React.memo(Item)
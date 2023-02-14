import { useEffect, useState } from "react";

export default function useQuantitySelect(
    maxQuantity:number,
    initialQuantity:number=0,
    incrementAction:()=>void=()=>{},
    decrementAction:()=>void=()=>{},
){
    const [quantity,setQuantity] = useState<number>(initialQuantity);
    const increment = ()=>{
        if(quantity<maxQuantity){
            incrementAction();
            setQuantity((qtt)=>(++qtt));
        }
    }
    const decrement = ()=>{
        if(quantity>0){
            decrementAction();
            setQuantity((qtt)=>(--qtt))
        }
    }

    return{
        quantity,
        increment,
        decrement,
        canIncrese:quantity<maxQuantity,
        canDecrese:quantity>0,
    }
}
import { useState } from "react";

export default function useQuantitySelect(maxQuantity:number,initialQuantity:number=0){
    const [quantity,setQuantity] = useState<number>(initialQuantity);

    const increment = ()=>{
        if(quantity<maxQuantity){
            setQuantity((quantity)=>(quantity++));
        }
    }
    const decrement = ()=>{
        if(quantity>0){
            setQuantity((quantity)=>(quantity--))
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
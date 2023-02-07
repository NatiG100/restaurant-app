import { useEffect, useState } from "react";

export default function useQuantitySelect(maxQuantity:number,initialQuantity:number=0){
    const [quantity,setQuantity] = useState<number>(initialQuantity);
    useEffect(()=>{
        console.log(quantity)
    },[quantity])
    const increment = ()=>{
        if(quantity<maxQuantity){
            setQuantity((qtt)=>(++qtt));
        }
    }
    const decrement = ()=>{
        if(quantity>0){
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
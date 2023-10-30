import { useEffect, useState } from "react";

/** 
 * Provides a convenient quantity selection mechanism (quantity can't be less than 0)
 * @param maxQuantity - quantity will not be more than this value
 * @param initialQuantity - the initial value of quantity 
 * @param incrementAction - a callback function to execute when value is incremented
 * @param decrementAction - a callback function to execute when value is decremented 
**/

export default function useQuantitySelect(
    maxQuantity:number,
    initialQuantity:number=0,
    incrementAction:()=>void=()=>{},
    decrementAction:()=>void=()=>{},
){
    //validates and sanitizes the initial quantity
    const [quantity,setQuantity] = useState<number>(
        initialQuantity<0?0:initialQuantity>maxQuantity?maxQuantity:initialQuantity
    );
    //a function to increment the quantity
    const increment = ()=>{
        if(quantity<maxQuantity){
            incrementAction();
            setQuantity((qtt)=>(++qtt));
        }
    }
    //a function to decrement the quantity
    const decrement = ()=>{
        if(quantity>0){
            decrementAction();
            setQuantity((qtt)=>(--qtt))
        }
    }
    // a function to change the quantity randomly
    const changeQt = (qt:number)=>{
        if(qt>0&&qt<=maxQuantity){
            setQuantity(qt);
        }
    }

    return{
        quantity,
        increment,
        decrement,
        canIncrese:quantity<maxQuantity,
        canDecrese:quantity>0,
        changeQt,
    }
}
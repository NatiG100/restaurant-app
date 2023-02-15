import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

import baseURL from "../../constants/BASE_URL";
import 'react-loading-skeleton/dist/skeleton.css'
import Header from "../../components/client/Header";
import IconButton from "../../components/UIElements/IconButton";

import {FaChevronLeft} from 'react-icons/fa'
import { useRouter } from "next/router";
import Divider from "../../components/UIElements/Divider";
import Item from "../../components/client/Item";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Context/store";
import { CartSliceType, saveCart, TypeItemContext } from "../../Context/CartSlice";
import { useDebouncedCallback } from "use-debounce";

export default function Cart(){
    const cart = useSelector<RootState,CartSliceType>((state)=>state?.cart);
    const dispatch = useDispatch();
    const debouncedSaveCart = useDebouncedCallback(()=>dispatch(saveCart()),1500);
    useEffect(()=>{
        debouncedSaveCart();
    },[cart])
    const router = useRouter();

    //logic for toggling description
    const [showId,setShowId] = useState<string>("");
    const handleClick = (id:string)=>{
        setShowId(id);
    }
    const isItemBeingShown = (id:string)=>{
        return id===showId;
    }

    return(
        <div className="relative">
            <Header>
                <div className="flex gap-3 items-center">
                   <div className="h-5 w-5 rounded-md bg-indigo-700/40 sticky top-0 left-0 right-0"></div>
                    <p className="text-gray-800">Cart</p>
                </div> 
            </Header>
            {cart?<>
                {cart.items.map(({item}:{item:TypeItemContext,count:number})=>(
                    <Item
                        cost={item.cost}
                        description={item.description}
                        id={item.id}
                        key={item.id}
                        img={item.img}
                        name={item.name}
                        type={item.type}
                        showDetai={isItemBeingShown(item.id)}
                        onClick={handleClick}
                        cart={cart}
                    />
                ))}            
            </>:
            <div className="px-6">
                <div className="grid grid-cols-mx1fr gap-4 items-center border border-gray-100 rounded-xl p-2 my-4">
                    <Skeleton circle width={70} height={70}/>
                    <Skeleton height={20} count={2}/>
                </div>
                <div className="grid grid-cols-mx1fr gap-4 items-center border border-gray-100 rounded-xl p-2 my-4">
                    <Skeleton circle width={70} height={70}/>
                    <Skeleton height={20} count={2}/>
                </div>
                <div className="grid grid-cols-mx1fr gap-4 items-center border border-gray-100 rounded-xl p-2 my-4">
                    <Skeleton circle width={70} height={70}/>
                    <Skeleton height={20} count={2}/>
                </div>
                <div className="grid grid-cols-mx1fr gap-4 items-center border border-gray-100 rounded-xl p-2 my-4">
                    <Skeleton circle width={70} height={70}/>
                    <Skeleton height={20} count={2}/>
                </div>
            </div>
            }
        </div>
    );
};
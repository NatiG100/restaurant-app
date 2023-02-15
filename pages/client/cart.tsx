import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import Header from "../../components/client/Header";
import { useRouter } from "next/router";
import Item from "../../components/client/Item";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Context/store";
import { CartSliceType, saveCart, TypeItemContext } from "../../Context/CartSlice";
import { useDebouncedCallback } from "use-debounce";
import {FaShoppingCart as CartIcon} from 'react-icons/fa';
import Button from "../../components/UIElements/Button";

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
                    <div className="
                        h-7 w-7 rounded-full bg-indigo-500 flex 
                        items-center justify-center
                    "
                    >
                        <CartIcon className="text-white text-sm"/>
                    </div>
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
                        showCartIcon={false}
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
            {cart.items.length===0&&<>
                <div className="p-3 px-7">
                    <div className="
                        w-full flex items-center justify-center 
                        border rounded-full p-1 border-gray-200
                        animate-appear mt-4
                    ">
                        <p className="text-gray-400 text-lg">No items in cart</p>  
                    </div>
                </div>
            </>}
            {cart.items.length>0&&<>
                <div className="p-3 px-7">
                    <p className="text-lg font-bold text-gray-700">Total Cost</p>
                    <p className="text-gray-500 text-lg">{cart.totalCost} ETB</p>
                </div>
                <div className="w-full px-5">
                    <Button
                        className="w-full p-2 ml-auto mr-auto mb-3"
                    >Order Now</Button>
                </div>
            </>}
        </div>
    );
};
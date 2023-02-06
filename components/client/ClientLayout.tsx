import React from "react";
import IconButton from "../UIElements/IconButton";
import {
    FaHamburger as FoodIcon, 
    FaGlassMartini as DrinkIcon,
    FaShoppingCart as CartIcon
} from 'react-icons/fa';
import { useRouter } from "next/router";

export default function ClientLayout({children}:{children:React.ReactNode}){
    const router = useRouter();
    return (
        <div className="w-full h-screen flex justify-center bg-white">
            <div className="w-full h-full max-w-3xl flex flex-col justify-between">
                <div className="w-full bg-indigo-500 h-20 flex items-center px-4">
                    <p className="text-lg text-white">Restaurant App</p>
                </div>
                <div className="h-full overflow-y-auto">
                    {children}
                </div>
                <div className="
                    w-full h-20 border-t border-gray-100 
                    flex justify-between items-center
                    px-4 gap-2 bg-gray-50
                ">
                    <IconButton
                        iconStart={<FoodIcon/>}
                        className="w-full h-10"
                        type="text"
                        color={router.pathname.includes("/client/foods")?"primary":"default"}
                        onClick={()=>router.push('/client/foods')}
                        size="smd"
                    >
                        Foods
                    </IconButton>
                    <IconButton
                        iconStart={<DrinkIcon/>}
                        className="w-full h-10"
                        type="text"
                        color={router.pathname.includes("/client/drinks")?"primary":"default"}
                        onClick={()=>router.push('/client/drinks')}
                        size="smd"
                    >
                        Drinks
                    </IconButton>
                    <IconButton
                        iconStart={<CartIcon/>}
                        className="w-full h-10"
                        type="text"
                        color={router.pathname=="/client/cart"?"primary":"default"}
                        onClick={()=>router.push('/client/cart')}
                        size="smd"
                    >
                        Cart
                    </IconButton>
                </div>
            </div>
        </div>
    );
}
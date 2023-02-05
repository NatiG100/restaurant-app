import React from "react";
import IconButton from "../UIElements/IconButton";
import {
    FaHamburger as FoodIcon, 
    FaGlassMartini as DrinkIcon,
    FaShoppingCart as CartIcon
} from 'react-icons/fa';

export default function ClientLayout({children}:{children:React.ReactNode}){
    return (
        <div className="w-full h-screen flex justify-center">
            <div className="w-full h-full max-w-3xl flex flex-col justify-between">
                <div className="w-full bg-indigo-500 h-16 flex items-center px-4">
                    <p className="text-lg text-white">Restaurant App</p>
                </div>
                <div>
                    {children}
                </div>
                <div className="
                    w-full h-16 border-t-2 border-gray-200 
                    flex justify-between items-center
                    px-4 gap-2
                ">
                    <IconButton
                        iconStart={<FoodIcon/>}
                        className="w-full h-10"
                        type="text"
                    >
                        Foods
                    </IconButton>
                    <IconButton
                        iconStart={<DrinkIcon/>}
                        className="w-full h-10"
                        type="text"
                    >
                        Drinks
                    </IconButton>
                    <IconButton
                        iconStart={<CartIcon/>}
                        className="w-full h-10"
                        type="text"
                    >
                        Cart
                    </IconButton>
                </div>
            </div>
        </div>
    );
}
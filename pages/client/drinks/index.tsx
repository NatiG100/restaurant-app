import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import Category from "../../../components/client/Category";
import baseURL from "../../../constants/BASE_URL";
import { fetchAllDrinkCategories, fetchAllFoodCategories } from "../../../services/ClientServices";
import { TypeCustomeErrorResponse, TypeMultiDataResponse } from "../../../types/types";
import 'react-loading-skeleton/dist/skeleton.css'
import Header from "../../../components/client/Header";

export default function Drinks(){
    const {data,error,isLoading} = useQuery<
        TypeMultiDataResponse,
        TypeCustomeErrorResponse
    >('fetchAllActiveDrinkCategories',fetchAllDrinkCategories);
    useEffect(()=>{
        if(error){
            toast(error.message,{type:"error"})
        }
        console.log(data?.data)
    },[error,data])

    
    return(
        <div className="relative">
            <Header>
                <div className="flex gap-3 items-center">
                    <div className="h-5 w-5 rounded-md bg-indigo-700/40 sticky top-0 left-0 right-0"></div>
                    <p className="text-gray-800">Food Categories</p>
                </div>
            </Header>
            {!isLoading?<>
                {data?.data.map((drinkCategory)=>(
                    <Category
                        title={drinkCategory.name} 
                        img={baseURL+""+drinkCategory.img}
                        numberOfItems={drinkCategory.drinkCount} 
                        description={drinkCategory.description}
                        id={drinkCategory.id}
                        key={drinkCategory.id}
                        type={"drink"}
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
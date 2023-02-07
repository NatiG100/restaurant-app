import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import Category from "../../../components/client/Category";
import baseURL from "../../../constants/BASE_URL";
import { fetchAllFoodCategories } from "../../../services/ClientServices";
import { TypeCustomeErrorResponse, TypeMultiDataResponse } from "../../../types/types";
import 'react-loading-skeleton/dist/skeleton.css'
import Header from "../../../components/client/Header";
import IconButton from "../../../components/UIElements/IconButton";

import {FaChevronLeft} from 'react-icons/fa'
import { useRouter } from "next/router";
import Divider from "../../../components/UIElements/Divider";
import Item from "../../../components/client/Item";

export default function Foods(){
    const router = useRouter();
    const {data,error} = useQuery<
        TypeMultiDataResponse,
        TypeCustomeErrorResponse
    >('fetchAllActiveFoodCategories',fetchAllFoodCategories);
    useEffect(()=>{
        if(error){
            toast(error.message,{type:"error"})
        }
        console.log(data?.data)
    },[error,data])


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
                <div className="flex gap-3 items-center h-6">
                    <IconButton 
                        iconStart={<FaChevronLeft/>} 
                        type={'text'}
                        onClick={()=>router.back()}
                    >Categories</IconButton>
                    <Divider orientation="v"/>
                    <p className="text-gray-700/80">{router.query.name}</p>
                </div>
            </Header>
            {data?.data?<>
                {data?.data.map((foodCategory)=>(
                    <Item
                        cost={400}
                        description="This is a test description don't worry about it"
                        id={foodCategory.id}
                        key={foodCategory.id}
                        img={baseURL+foodCategory.img}
                        name={foodCategory.name}
                        type={"food"}
                        showDetai={isItemBeingShown(foodCategory.id)}
                        onClick={handleClick}
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
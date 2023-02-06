import { useEffect } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import Category from "../../../components/client/Category";
import baseURL from "../../../constants/BASE_URL";
import { fetchAllFoodCategories } from "../../../services/ClientServices";
import { TypeCustomeErrorResponse, TypeMultiDataResponse } from "../../../types/types";

export default function Foods(){
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

    
    return(
        <div>
            <>
                <Category title="All" img="/dessert.jpg" numberOfItems={44}/>
                {data?.data.map((foodCategory)=>(
                    <Category 
                        title={foodCategory.name} 
                        img={baseURL+""+foodCategory.img}
                        numberOfItems={foodCategory.foodCount} 
                        description={foodCategory.description}
                        id={foodCategory.id}
                        key={foodCategory.id}
                    />
                ))}            
            </>
        </div>
    );
};
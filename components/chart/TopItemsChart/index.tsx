
import TopSalesView from '../../TopSalesView';
import { useQuery } from 'react-query';
import { getTopItems, TypeTopItems } from '../../../services/StatService';
import Loading from '../../UIElements/Loading';
import { ErrorResponse } from '../../../types/types';
import { useState } from 'react';


export default function TopItemsChart(){
    const [nOfItems,setNOfItems] = useState<3|5|10>(3);
    const {data,isLoading,isError} = useQuery<TypeTopItems,ErrorResponse>(['fetchTopItems',nOfItems],()=>getTopItems(nOfItems));
    if(isLoading) return <Loading type="contained"/>
    return(
        <div className={`
            w-full h-full self-stretch grid 
            grid-rows-1fr1fr gap-8 ml-auto mr-auto
            col-span-2 md:col-span-1
        `}>
            { data?.data&&
                <>
                    <TopSalesView 
                        items={data.data.topFoods} 
                        title=" Foods"
                        value={nOfItems}
                        setOption={setNOfItems}
                    />
                    <TopSalesView 
                        items={data.data.topDrinks} 
                        title=" Drinks"
                        value={nOfItems}
                        setOption={setNOfItems}   
                    />
                </>
            }
        </div>
    );
}
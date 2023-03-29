
import TopSalesView from '../../TopSalesView';
import { useQuery } from 'react-query';
import { getTopItems, TypeTopItems } from '../../../services/StatService';
import Loading from '../../UIElements/Loading';
import { ErrorResponse } from '../../../types/types';


export default function TopItemsChart(){
    const {data,isLoading,isError} = useQuery<TypeTopItems,ErrorResponse>('fetchTopItems',getTopItems);
    if(isLoading) return <Loading type="contained"/>
    return(
        <div className={`
            w-full h-full self-stretch grid 
            grid-rows-1fr1fr gap-8 ml-auto mr-auto
            col-span-2 md:col-span-1
        `}>
            { data?.data&&
                <>
                    <TopSalesView items={data.data.topFoods} title="Top 3 Foods"/>
                    <TopSalesView items={data.data.topDrinks} title="Top 3 Drinks"/>
                </>
            }
        </div>
    );
}
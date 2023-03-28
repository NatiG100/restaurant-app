import food1 from './../../../assets/img/sampleimg/burgar.jpg';
import food2 from './../../../assets/img/sampleimg/pizza.jpg';
import food3 from './../../../assets/img/sampleimg/salad.jpg';

import drink1 from './../../../assets/img/sampleimg/drink1.jpg';
import drink2 from './../../../assets/img/sampleimg/drink2.jpg';
import drink3 from './../../../assets/img/sampleimg/drink3.jpg';
import { SalesItemInterface } from '../../TopSalesView/SalesItem';
import SalesChart from '../charts/Sales';
import TopSalesView from '../../TopSalesView';
import { useQuery } from 'react-query';
import { getTopItems, TypeTopItems } from '../../../services/StatService';
import Loading from '../../UIElements/Loading';
import { ErrorResponse } from '../../../types/types';

const foods: SalesItemInterface[] = [
    {
        amount:42,
        img:food1,
        name:"በርገር"
    },
    {
        amount:23,
        img:food2,
        name:"ፒዛ"
    },
    {
        amount:31,
        img:food1,
        name:"ሠላጣ"
    }
]

const drinks: SalesItemInterface[] = [
    {
        amount:42,
        img:drink1,
        name:"Juice"
    },
    {
        amount:23,
        img:drink2,
        name:"Sprise"
    },
    {
        amount:31,
        img:drink3,
        name:"Coke"
    }
]

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
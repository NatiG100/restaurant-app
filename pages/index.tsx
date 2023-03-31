import React, { useEffect, useState } from "react"
import Body from "../components/Body";
import Stat, { notation } from "../components/chart/Stat";
import Search, { SearchSize } from "../components/Search";
import {FiDollarSign as DollarIcon} from 'react-icons/fi'
import {MdOutlineLunchDining as FoodIcon} from 'react-icons/md'
import {BiDrink as DrinkIcon} from 'react-icons/bi'
import SalesChart from "../components/chart/charts/Sales";
import TopSalesView from "../components/TopSalesView";
import TopItemsChart from "../components/chart/TopItemsChart";
import Orders from "../components/chart/charts/Orders";
import usePageRedirect from "../components/hoc/usePageRedirect";
import Loading from "../components/UIElements/Loading";
import { useQuery } from "react-query";
import { getGeneralStat } from "../services/StatService";

function Home({setAppBarComponent} : any) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
    setSearchQuery(event.target.value);
  }
  useEffect(()=>{
    setAppBarComponent(
      <Search 
        onChange={handleChange} 
        value={searchQuery} 
        size={SearchSize.lg}
      />
    );
    return ()=>{
      setAppBarComponent(<div></div>);
    }
  },[searchQuery]);

  //fetch general stat
  const {data:generalStat,isLoading} = useQuery('fetchGeneralStat',getGeneralStat);
  //redirect page
  const finished = usePageRedirect("View Info");
  if(!finished) return <Loading type="full"/>

  return (
    <Body title="Dashboard">
      <div className="grid 2xl:grid-cols-[2fr,3fr]   grid-rows-autoRow pt-2 gap-y-8 gap-x-8 items-stretch">
        <div className=" flex flex-wrap gap-4 col-span-2">
          {isLoading?<Loading type="contained"/>:generalStat&&<><Stat 
            delta={generalStat.data.salesDelta} 
            notation={notation.K} 
            precision={1} 
            title="Weekly Sales" 
            value={generalStat.data.weeklySales} 
            postfix="ETB"
            icon={<DollarIcon size={36} className="text-white stroke-2"/>}
          />
          <Stat 
            delta={generalStat.data.weeklyDrinkIncrease} 
            notation={notation.none} 
            precision={0} 
            title="Total Drinks" 
            value={generalStat.data.drinkCount} 
            icon={<DrinkIcon size={36} className="text-white"/>}
          />
          <Stat 
            delta={generalStat.data.weeklyFoodIncrease} 
            notation={notation.none} 
            precision={0} 
            title="Total foods" 
            value={generalStat.data.foodCount} 
            icon={<FoodIcon size={36} className="text-white"/>}
          /></>}
        </div>
        <div className="w-full col-span-2 min-h-[450px] 2xl:col-span-1">
          <TopItemsChart/>
        </div>

        <div className="w-full col-span-2 min-h-[450px] 2xl:col-span-1">
          <SalesChart/>
        </div>
        <div className="h-[1000px] w-full flex flex-col col-span-2 gap-10">
          <Orders/>
          <Orders/>
        </div>
      </div>
    </Body>
  )
}

export default React.memo(Home);
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

  return (
    <Body title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-dashboard pt-8 gap-y-12 gap-x-8 items-stretch">
        <div className=" flex flex-wrap gap-6 col-span-2">
          <Stat 
            delta={40} 
            notation={notation.K} 
            precision={1} 
            title="Weekly Sales" 
            value={98500} 
            postfix="ETB"
            icon={<DollarIcon size={36} className="text-white stroke-2"/>}
          />
          <Stat 
            delta={-5} 
            notation={notation.none} 
            precision={0} 
            title="Total Drinks" 
            value={300} 
            icon={<DrinkIcon size={36} className="text-white"/>}
          />
          <Stat 
            delta={40} 
            notation={notation.none} 
            precision={0} 
            title="Total foods" 
            value={150} 
            icon={<FoodIcon size={36} className="text-white"/>}
          />
        </div>
        <TopItemsChart/>
        <SalesChart/>
        <Orders/>
      </div>
    </Body>
  )
}

export default React.memo(Home);
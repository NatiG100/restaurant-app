import React, { useEffect, useState } from "react"
import Body from "../components/Body";
import Stat, { notation } from "../components/chart/Stat";
import Search, { SearchSize } from "../components/Search";
import {FiDollarSign as DollarIcon} from 'react-icons/fi'
import {MdOutlineLunchDining as FoodIcon} from 'react-icons/md'
import {BiDrink as DrinkIcon} from 'react-icons/bi'
import ChartContainer from "../components/chart/ChartContainer";

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

  // state logic for the chart
  const [selectedOption, setSelectedOption] = useState<number>(1);
  const onSelectChange = (event:React.ChangeEvent<HTMLSelectElement>) =>{
    setSelectedOption(Number.parseInt(event.target.value));
  }

  return (
    <Body title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-autoRow pt-12 gap-y-8">
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

        <ChartContainer
          hasFilter={true}
          filterItems={[
            {key:1,text:"Last 7 days"},
            {key:2,text:"Last Month"},
            {key:3,text:"This Year"},
          ]}
          title="Sales"
          selected={selectedOption}
          onChange={onSelectChange}
          loading={false}
        >
          <p>Chart Placeholder</p>
        </ChartContainer>        
      </div>
    </Body>
  )
}

export default React.memo(Home);
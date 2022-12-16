import React, { useEffect, useState } from "react"
import Body from "../components/Body";
import Stat, { notation } from "../components/chart/Stat";
import Search, { SearchSize } from "../components/Search";
import {FiDollarSign as DollarIcon} from 'react-icons/fi'

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
  },[searchQuery])

  return (
    <Body title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-autoRow pt-6">
        <div className="col-span-2">
          <Stat 
            delta={40} 
            notation={notation.K} 
            precision={1} 
            title="Weekly Sales" 
            value={98500} 
            postfix="ETB"
            icon={<DollarIcon/>}
          />
        </div>
        
      </div>
    </Body>
  )
}

export default React.memo(Home);
import React, { useEffect, useState } from "react"
import Body from "../components/Body";
import Search, { SearchSize } from "../components/Search"

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
      <p className="text-2xl">Dashboard</p>
    </Body>
  )
}

export default React.memo(Home);
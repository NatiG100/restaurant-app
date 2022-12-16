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
      <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-autoRow pt-6">
        <p className="col-span-2">Item</p>
        <p>Item</p>
        <p>Item</p>
        <p>Item</p>
        <p>Item</p>
        <p>Item</p>
        <p>Item</p>
        <p>Item</p>
        <p>Item</p>
        <p>Item</p>
      </div>
    </Body>
  )
}

export default React.memo(Home);
import React, { useEffect, useState } from "react"
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
  },[searchQuery])

  return (
    <div><p className="text-2xl">Dashboard</p></div>
  )
}

export default React.memo(Home);
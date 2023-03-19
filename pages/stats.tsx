import { useEffect } from "react";
import Body from "../components/Body";
import usePageRedirect from "../components/hoc/usePageRedirect";
import StatGroup from "../components/stats/StatGroup";
import StatItem from "../components/stats/StatItem";
import Button from "../components/UIElements/Button";
import Input from "../components/UIElements/Input";
import LabledInput from "../components/UIElements/LabledInput";
import Loading from "../components/UIElements/Loading";
import useFromTo from "../hooks/useFromTo";
import { formatDate } from "../utils/date";

export default function Stats({setAppBarComponent}:any){
  const {from,to,error,onFromChange,onToChange} = useFromTo();
  useEffect(()=>{
    setAppBarComponent(
      <div className="h-full flex gap-4 items-center">
        <p className="text-lg font-semibold text-gray-600">From</p>
        <Input
          type="date"
          onChange={onFromChange}
          value={from}
        />
        <p className="text-lg font-semibold text-gray-600">To</p>
        <Input
          type="date"
          onChange={onToChange}
          value={to}
        />
        <Button className="w-24 py-2">Generate</Button>
      </div>
    );
    return ()=>{
      setAppBarComponent(<div></div>);
    }
  },[from,to,onFromChange,onToChange]);
  
  const stats = [
    {
      title:"Total Orders",
      value:2500,
    },
    {
      title:"Orders/day (Avg)",
      value:25,
    },
    {
      title:"Total Food Orders",
      value:2500,
    },
    {
      title:"Food Orders/day (Avg)",
      value:14,
    },
    {
      title:"Total Drink Orders",
      value:2500,
    },
    {
      title:"Drink Orders/day (Avg)",
      value:12,
    },
  ]
    //redirect page
    const finished = usePageRedirect("View Info");
    if(!finished) return <Loading type="full"/>
    return (
    <Body title="Stats">
      <div className="
        w-full p-6 pb-10 rounded-md shadow-sm h-max bg-white
        flex gap-10 flex-wrap
      ">
        <StatGroup
          title="Order"
          stats={stats}
        />
        <StatGroup
          title="Order"
          stats={stats}
        />
        <StatGroup
          title="Order"
          stats={stats}
        />
      </div>
    </Body>
    );
}
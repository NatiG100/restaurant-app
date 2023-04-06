import { useEffect,useState } from "react";
import { useQuery } from "react-query";
import Body from "../components/Body";
import usePageRedirect from "../components/hoc/usePageRedirect";
import StatGroup from "../components/stats/StatGroup";
import StatItem, { TypeStatItem } from "../components/stats/StatItem";
import Button from "../components/UIElements/Button";
import Input from "../components/UIElements/Input";
import LabledInput from "../components/UIElements/LabledInput";
import Loading from "../components/UIElements/Loading";
import useFromTo from "../hooks/useFromTo";
import { GenerateReport } from "../services/chartServices/GenerateReportService";
import { formatDate } from "../utils/date";

export default function Stats({setAppBarComponent}:any){
  const {from,to,error,onFromChange,onToChange} = useFromTo();
  useEffect(()=>{
    console.log(from)
    console.log(to)
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
        <Button className="w-24 py-2" onClick={()=>{refetch()}}>Generate</Button>
      </div>
    );
    return ()=>{
      setAppBarComponent(<div></div>);
    }
  },[from,to,onFromChange,onToChange]);

  const {data,isLoading,isError,refetch} = useQuery('generateReport',()=>GenerateReport(from,to),)
  const [ordersStats,setOrderStats] = useState<TypeStatItem[]>([]);
  const [salesStats,setSalesStats] = useState<TypeStatItem[]>([]);
  useEffect(()=>{
    if(data){
      setOrderStats([
        {title:"Total Orders",value:data.data.order?.total},
        {title:"Orders/day (Avg)",value:data.data.order?.avgTotal},
        {title:"Total Food Orders",value:data.data.order?.food},
        {title:"Food Orders/day (Avg)",value:data.data.order?.avgFood},
        {title:"Total Drink Order",value:data.data.order?.drink},
        {title:"Drink Orders/day (avg)",value:data.data.order?.avgDrink},
      ]);
      setSalesStats([
        {title:"Total Sales",value:data.data.sales?.total,postfix:"ETB",multiplier:"K",fixTo:2},
        {title:"Sales/day (Avg)",value:data.data.sales?.avgTotal,postfix:"ETB",multiplier:"K",fixTo:2},
        {title:"Total Food Sales",value:data.data.sales?.food,postfix:"ETB",multiplier:"K",fixTo:2},
        {title:"Food Sales/day (Avg)",value:data.data.sales?.avgFood,postfix:"ETB",multiplier:"K",fixTo:2},
        {title:"Total Drink Order",value:data.data.sales?.drink,postfix:"ETB",multiplier:"K",fixTo:2},
        {title:"Drink Sales/day (avg)",value:data.data.sales?.avgDrink,postfix:"ETB",multiplier:"K",fixTo:2},
      ]);
    }
  },[data])
  
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
          stats={ordersStats}
        />
        <StatGroup
          title="Sales"
          stats={salesStats}
        />
      </div>
    </Body>
    );
}
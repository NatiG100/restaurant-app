import React, { useState } from "react";
import {  useQuery } from "react-query";
import chartType from "../../../constants/constants";
import { FetchOrdersChartData, OrderChartDataRes } from "../../../services/chartServices/OrdersService";
import { ErrorResponse } from "../../../types/types";
import ChartContainer from "../ChartContainer";
import CustomLineChart from "../CustomLineChart";

export default function Orders(){
    const [selectedOption, setSelectedOption] = useState<number>(1);
    const [selectedType,setSelectedType] = useState<"food"|"drink"|"all">("all");
    const onSelectCchange = (event:React.ChangeEvent<HTMLSelectElement>)=>{
        setSelectedOption(Number.parseInt(event.target.value));
    }
    const {data,isLoading,isError} = useQuery<
        OrderChartDataRes,
        ErrorResponse
    >(['fetchOrderChartData',selectedOption,selectedType],()=>FetchOrdersChartData(chartType[selectedOption],selectedType));
    if(isError) return <p className="text-red-600">Some error occured while fetching chart data</p>;

    const typeSelector = <select 
            className="focus:outline-none border p-2 rounded-md text-gray-800" 
            value={selectedType}
            onChange={(event)=>{setSelectedType(event.target.value as "all"|"food"|"drink")}}
        >
            <option 
                value={"all"}
            >
                All
            </option>
            <option 
                value={"food"}
            >
                Foods
            </option>
            <option 
                value={"drink"}
            >
                Drinks
            </option>
        </select>
    return(
        <ChartContainer
            loading={isLoading}
            title="Orders"
            selected={selectedOption}
            onChange={onSelectCchange}
            filterItems={[
                {key:1,text:"This Week"},
                {key:2,text:"This Month"},
                {key:3,text:"This Year"},
                {key:4, text:"All"}
            ]}
            additionalComponent={typeSelector}
            hasFilter={true}
            span={2}
        >
            {data&&
                <CustomLineChart 
                    datas={data.data}
                    colors={data.data.map((d)=>(
                        d._id==="Cancelled"?"#b91c1c":d._id==="Served"?"#16a34a":d._id==="Pending"?"#eab308":d._id==="Started"?"#4f46e5":"#000"
                    ))}
                    selectedOption={selectedOption}
                    legend={
                        [
                            {name:"Served",symbol:{fill:"#16a34a77"}},
                            {name:"Pending",symbol:{fill:"#eab30877"}},
                            {name:"Started",symbol:{fill:"#4f46e577"}},
                            {name:"Cancelled",symbol:{fill:"#b91c1c77"}},
                        ]
                    }
                />
            }
        </ChartContainer>
    );
}
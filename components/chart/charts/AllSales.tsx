import React, { useState } from "react";
import {  useQuery } from "react-query";
import chartType from "../../../constants/constants";
import { getAllsales, TypeAllSalesChart } from "../../../services/chartServices/AllSalesService";
import { FetchOrdersChartData, OrderChartDataRes } from "../../../services/chartServices/OrdersService";
import { ErrorResponse } from "../../../types/types";
import ChartContainer from "../ChartContainer";
import CustomLineChart from "../CustomLineChart";
import ToggleBtn from "../../UIElements/ToggleBtn";

export default function AllSales(){
    const [interpolate,setInterpolate] = useState<boolean>(true);
    const [selectedOption, setSelectedOption] = useState<number>(2);
    const [selectedType,setSelectedType] = useState<"food"|"drink"|"all">("all");
    const onSelectCchange = (event:React.ChangeEvent<HTMLSelectElement>)=>{
        setSelectedOption(Number.parseInt(event.target.value));
    }
    const {data,isLoading,isError} = useQuery<
        TypeAllSalesChart,
        ErrorResponse
    >(['fetchAllSales',selectedOption,selectedType],()=>getAllsales(selectedType));
    if(isError) return <p className="text-red-600">Some error occured while fetching chart data</p>;

    const typeSelector = <>
        <ToggleBtn setIsOn={setInterpolate} isOn={interpolate}/>
        <select 
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
    </>
    return(
        <ChartContainer
            loading={isLoading}
            title="Sales (all)"
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
            hideChartTypeFilter={true}
        >
            {data&&
                <CustomLineChart
                    interpolate={interpolate}
                    zoomable={true}
                    datas={[
                        {
                            _id:"Served",
                            data:data.data.map((d)=>({amount:d.total,date:d._id}))||[]
                        }
                    ]}
                    colors={["#16a34a",]}
                    selectedOption={selectedOption}
                    legend={
                        [
                        ]
                    }
                    drawPoints={false}
                />
            }
        </ChartContainer>
    );
}
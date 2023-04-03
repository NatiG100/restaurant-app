import { TooltipComponent } from "ag-grid-community/dist/lib/components/framework/componentTypes";
import { error } from "console";
import React, { useState } from "react";
import { useQueries, useQuery } from "react-query";
import { VictoryAxis, VictoryContainer, VictoryLabel, VictoryLegend, VictoryLine, VictoryScatter, VictoryTooltip } from "victory";
import chartType, { DOtW, MOtY } from "../../../constants/constants";
import { FetchOrdersChartData, OrderChartDataRes } from "../../../services/chartServices/OrdersService";
import { ErrorResponse } from "../../../types/types";
import ResponsiveVictoryChart from "../../ResponsiveVictoryChart";
import Loading from "../../UIElements/Loading";
import ChartContainer from "../ChartContainer";
import CustomLineChart from "../CustomLineChart";

export default function Orders(){
    const [selectedOption, setSelectedOption] = useState<number>(1);
    const onSelectCchange = (event:React.ChangeEvent<HTMLSelectElement>)=>{
        setSelectedOption(Number.parseInt(event.target.value));
    }
    const {data,isLoading,isError} = useQuery<
        OrderChartDataRes,
        ErrorResponse
    >(['fetchOrderChartData',selectedOption],()=>FetchOrdersChartData(chartType[selectedOption]));

    const foods = [
        {day:"Mon", value:12},
        {day:"Tue", value:30},
        {day:"Wed", value:10},
        {day:"Thr", value:11},
        {day:"Fri", value:12},
        {day:"Sat", value:16},
        {day:"Sun", value:25},
    ];
    const drinks = [
        {day:"Mon", value:22},
        {day:"Tue", value:12},
        {day:"Wed", value:14},
        {day:"Thr", value:11},
        {day:"Fri", value:17},
        {day:"Sat", value:11},
        {day:"Sun", value:16},
    ];
    if(isError) return <p className="text-red-600">Some error occured while fetching chart data</p>
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
            hasFilter={true}
            span={2}
        >
            {data&&
                <CustomLineChart 
                    datas={[
                        data?.data.filter((data)=>(data._id==="Cancelled"))[0]?.data||[],
                        data?.data.filter((data)=>(data._id==="Pending"))[0]?.data||[],
                        data?.data.filter((data)=>(data._id==="Started"))[0]?.data||[],
                        data?.data.filter((data)=>(data._id==="Served"))[0]?.data||[],
                    ]}
                    colors={["#b91c1c","#eab308","#4f46e5","#16a34a",]}
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
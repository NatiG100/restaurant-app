import ChartContainer from "../ChartContainer";
import {useState} from 'react';
import { VictoryChart } from "victory-chart";
import {VictoryBar,VictoryAxis,VictoryLabel} from 'victory'
import { VictoryTheme } from "victory-core";
import ResponsiveVictoryChart from "../../ResponsiveVictoryChart";
import { useQuery } from "react-query";
import { getSalesChartData, TypeSalesChart } from "../../../services/chartServices/SalesChartService";
import { ErrorResponse } from "../../../types/types";
import Loading from "../../UIElements/Loading";
import chartType from "../../../constants/constants";
import {useEffect} from 'react'

export default function SalesChart(){
    const [selectedOption, setSelectedOption] = useState<number>(1);
    const onSelectChange = (event:React.ChangeEvent<HTMLSelectElement>) =>{
        setSelectedOption(Number.parseInt(event.target.value));
    }

    const {data,isLoading,isError,refetch} = useQuery<
        TypeSalesChart,
        ErrorResponse
    >(['fetchSalesChartData',selectedOption],()=>getSalesChartData(chartType[selectedOption]));

    if(isLoading) return <Loading type="contained"/>
    if(isError) return <p className="text-red-50">Error</p>
    return(
        <ChartContainer
          hasFilter={true}
          filterItems={[
            {key:1,text:"This Week"},
            {key:2,text:"This Month"},
            {key:3,text:"This Year"},
            {key:4, text:"All"}
          ]}
          title="Sales"
          selected={selectedOption}
          onChange={onSelectChange}
          loading={false}
          span={1}
        >
            <ResponsiveVictoryChart
                padding={{ top: 10, bottom: 20, right: 50, left: 70 }}
                domainPadding={30}
            >
                <VictoryAxis 
                    style={{
                        tickLabels:{fill:"rgb(99 102 241)"},
                        axis:{stroke:"rgb(99 102 241)"},
                    }}
                    />
                <VictoryAxis 
                    
                    dependentAxis
                    label={"Sales(ETB)"}
                    style={{
                        tickLabels:{fill:"rgb(99 102 241)"},
                        axis:{stroke:"rgb(99 102 241)"},
                        axisLabel:{fill:"rgb(99 102 241)",fontWeight:"600"},
                    }}
                    fixLabelOverlap={true}
                    axisLabelComponent={<VictoryLabel dy={-28}/>}
                />
                {data&&<VictoryBar
                    style={{
                        data:{
                            fill:"rgb(74 222 128)",
                            width:"20",
                            opacity:"0.7"
                        },
                    }}
                    
                    data={data?.data}
                    x="_id"
                    y="total"
                    labels={({ datum }) => datum.total}
                    labelComponent={<VictoryLabel renderInPortal dy={-20}/>}
                />}
            </ResponsiveVictoryChart>
        </ChartContainer>   
    );
}
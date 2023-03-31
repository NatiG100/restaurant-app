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
import chartType, { DOtW, MOtY } from "../../../constants/constants";
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
          loading={isLoading}
          span={1}
          >
            {isError&&
                <p className="text-red-50">Error</p>
            }
            {data&&
            <ResponsiveVictoryChart
                padding={{ top: 10, bottom: 20, right: 50, left: 70 }}
                domainPadding={30}
                >
                <VictoryAxis 
                    style={{
                        tickLabels:{fill:"rgb(55 65 81)",fontSize:"12px"},
                        axis:{stroke:"rgb(55 65 81)"},
                    }}
                    tickFormat={(x:string,index:number) => {
                        if(selectedOption===2||selectedOption===4){
                            return x;
                        }else if(selectedOption===1){
                            const dates = data.data.map((d)=>(d._id));
                            return DOtW[dates.indexOf(x)]
                        }else{
                            return MOtY[parseInt(x)-1];
                        }
                    }}
                    />
                <VictoryAxis 
                    
                    dependentAxis
                    label={"Sales(ETB)"}
                    style={{
                        tickLabels:{fill:"rgb(55 65 81)",fontSize:"12px"},
                        axis:{stroke:"rgb(55 65 81)"},
                        axisLabel:{fill:"rgb(55 65 81)",fontWeight:"600"},
                        grid:{
                            stroke:"rgb(55 65 81)",
                            opacity:"0.07",
                            strokeWidth:"2"
                        }
                    }}
                    
                    fixLabelOverlap={true}
                    axisLabelComponent={<VictoryLabel dy={-28}/>}
                />
                <VictoryBar
                    style={{
                        data:{
                            fill:"rgb(74 222 128)",
                            minHeight:"10px",
                            width:selectedOption===2?"11":"17",
                            opacity:"0.8",
                        },
                    }}
                    
                    data={data?.data}
                    x="_id"
                    y="total"
                    labels={({ datum }) => datum.total}
                    labelComponent={<VictoryLabel renderInPortal dy={-20}/>}
                />
            </ResponsiveVictoryChart>}
        </ChartContainer>   
    );
}
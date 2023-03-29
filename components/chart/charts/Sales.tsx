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
import chartType, { MOtY } from "../../../constants/constants";
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
                        tickLabels:{fill:"rgb(99 102 241)"},
                        axis:{stroke:"rgb(99 102 241)"},
                    }}
                    tickFormat={(x:string) => {
                        if(selectedOption===2||selectedOption===4){
                            return x;
                        }else if(selectedOption===1){
                            return x;
                        }else{
                            return MOtY[parseInt(x)-1];
                        }
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
                <VictoryBar
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
                />
            </ResponsiveVictoryChart>}
        </ChartContainer>   
    );
}
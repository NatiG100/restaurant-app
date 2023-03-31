import { TooltipComponent } from "ag-grid-community/dist/lib/components/framework/componentTypes";
import React, { useState } from "react";
import { VictoryAxis, VictoryContainer, VictoryLabel, VictoryLegend, VictoryLine, VictoryScatter, VictoryTooltip } from "victory";
import ResponsiveVictoryChart from "../../ResponsiveVictoryChart";
import ChartContainer from "../ChartContainer";

export default function Orders(){
    const [selectedOption, setSelectedOption] = useState<number>(1);
    const onSelectCchange = (event:React.ChangeEvent<HTMLSelectElement>)=>{
        setSelectedOption(Number.parseInt(event.target.value));
    }
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
    return(
        <ChartContainer
            loading={false}
            title="Orders"
            selected={selectedOption}
            onChange={onSelectCchange}
            filterItems={[
                {key:1,text:"Last 7 days"},
                {key:2,text:"Last Month"},
                {key:3,text:"This Year"},
            ]}
            hasFilter={true}
            span={2}
        >
            <ResponsiveVictoryChart
                padding={{ top: 0, bottom: 20, right: 50, left: 70 }}
                domainPadding={30}
                
            >
                <VictoryAxis
                    style={{
                        tickLabels:{fill:"rgb(55 65 81)"},
                        axis:{stroke:"rgb(55 65 81)"},
                    }}
                />

                <VictoryAxis     
                    dependentAxis
                    label={"Orders"}
                    style={{
                        tickLabels:{fill:"rgb(55 65 81)"},
                        axis:{stroke:"rgb(55 65 81)"},
                        axisLabel:{fill:"rgb(55 65 81)",fontWeight:"600"},
                        grid:{
                            stroke:"rgb(55 65 81)",
                            opacity:"0.07",
                            strokeWidth:"2"
                        }
                    }}
                    fixLabelOverlap={true}
                    axisLabelComponent={
                        <VictoryLabel dy={-28} />
                    }
                />

                {/* ////////  Line chart for food orders and shadows  ///////// */}
                <VictoryLine
                    data={foods}
                    x="day"
                    y="value"
                    style={{
                        data:{
                            stroke:"#C026D322",
                            strokeLinecap:"round",
                            strokeWidth:"8px"
                        },
                        labels:{
                            fill:"rgb(192 38 211)",
                            fontSize:"15px",
                            fontWeight:"600"
                        }
                    }}
                />
                <VictoryLine
                    data={foods}
                    x="day"
                    y="value"
                    style={{
                        data:{
                            stroke:"rgb(192 38 211)",
                        },
                    }}
                />

                {/* ////////  Line chart for drinks orders and shadows  ///////// */}
                <VictoryLine
                    data={drinks}
                    x="day"
                    y="value"
                    style={{
                        data:{
                            stroke:"#0284C722",
                            strokeLinecap:"round",
                            strokeWidth:"8px",
                        },
                        labels:{
                            fill:"rgb(2 132 199)",
                            fontSize:"15px",
                            fontWeight:"600"
                        }
                    }}
                />
                <VictoryLine
                    data={drinks}
                    x="day"
                    y="value"
                    style={{
                        data:{
                            stroke:"rgb(2 132 199)",
                        },
                    }}
                />
                <VictoryScatter
                    labels={({datum})=>datum.value}
                    labelComponent={
                        <VictoryTooltip
                            
                          flyoutWidth={95}
                          flyoutHeight={35}
                          cornerRadius={5}
                          pointerLength={40}
                          flyoutStyle={{
                            stroke: "rgb(192 38 211)",
                            strokeWidth: 2,
                            fill: "#FFFFFF"
                          }}
                          style={{
                            fill: "rgb(192 38 211)",
                            fontSize: 14,
                            fontWeight: 500,
                            textAnchor: "middle"
                          }}
                        />
                    }
                    data={foods}
                    x="day"
                    y="value"
                    size={5}
                    style={{
                        data:{
                            fill:"#C026D3",
                        }
                    }}
                    
                />
                <VictoryScatter
                    labels={({datum})=>datum.value}
                    labelComponent={
                        <VictoryTooltip
                          flyoutWidth={95}
                          flyoutHeight={35}
                          cornerRadius={5}
                          pointerLength={40}
                          flyoutStyle={{
                            stroke: "rgb(2 132 199)",
                            strokeWidth: 2,
                            fill: "#FFFFFF"
                          }}
                          style={{
                            fill: "rgb(2 132 199)",
                            fontSize: 14,
                            fontWeight: 500,
                            textAnchor: "middle"
                          }}
                        />
                    }
                    data={drinks}
                    x="day"
                    y="value"
                    size={5}
                    style={{
                        data:{
                            fill:"#0284C7",
                        }
                    }}
                    
                />

            </ResponsiveVictoryChart>

        </ChartContainer>
    );
}
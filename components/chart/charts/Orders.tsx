import React, { useState } from "react";
import { VictoryAxis, VictoryContainer, VictoryLabel, VictoryLegend, VictoryLine, VictoryTooltip } from "victory";
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
        {day:"Thr", value:7},
        {day:"Fri", value:9},
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
                padding={{ top: 40, bottom: 20, right: 50, left: 70 }}
                domainPadding={30}
                
            >
                <VictoryLegend x={85} y={25}
                    title="Legend"
                    centerTitle
                    orientation={"horizontal"}
                    gutter={20}
                    style={{border:{stroke:"rgb(129 140 248)"},title:{fontSize:20,fill:"rgb(129 140 248)"}}}
                    data={[
                        {name:"Foods",symbol:{fill:"rgb(192 38 211)"}},
                        {name:"Drinks",symbol:{fill:"rgb(2 132 199)"}},
                    ]}
                    containerComponent={<VictoryContainer responsive={true}/>}
                />
                <VictoryAxis 
                    style={{
                        tickLabels:{fill:"rgb(20 83 45)"},
                        axis:{stroke:"rgb(20 83 45)"},
                    }}
                    />

                <VictoryAxis     
                    dependentAxis
                    label={"Orders"}
                    style={{
                        tickLabels:{fill:"rgb(20 83 45)"},
                        axis:{stroke:"rgb(20 83 45)"},
                        axisLabel:{fill:"rgb(20 83 45)",fontWeight:"600"},
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
                            stroke:"#C026D333",
                            strokeLinecap:"round",
                            strokeWidth:"8px"
                        },
                        labels:{
                            fill:"rgb(192 38 211)",
                            fontSize:"15px",
                            fontWeight:"600"
                        }
                    }}
                    labels={({ datum }) => datum.value}
                    labelComponent={<VictoryLabel renderInPortal dy={-20}/>}
                />
                <VictoryLine
                    data={foods}
                    x="day"
                    y="value"
                    style={{
                        data:{
                            stroke:"rgb(192 38 211)",
                        }
                    }}
                />

                {/* ////////  Line chart for drinks orders and shadows  ///////// */}
                <VictoryLine
                    data={drinks}
                    x="day"
                    y="value"
                    style={{
                        data:{
                            stroke:"#0284C733",
                            strokeLinecap:"round",
                            strokeWidth:"8px",
                        },
                        labels:{
                            fill:"rgb(2 132 199)",
                            fontSize:"15px",
                            fontWeight:"600"
                        }
                    }}
                    labels={({ datum }) => datum.value}
                    labelComponent={<VictoryLabel renderInPortal dy={-20}/>}
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

            </ResponsiveVictoryChart>

        </ChartContainer>
    );
}
import React, { useState } from "react";
import { VictoryAxis, VictoryLabel, VictoryLine } from "victory";
import ResponsiveVictoryChart from "../../ResponsiveVictoryChart";
import ChartContainer from "../ChartContainer";

export default function Orders(){
    const [selectedOption, setSelectedOption] = useState<number>(1);
    const onSelectCchange = (event:React.ChangeEvent<HTMLSelectElement>)=>{
        setSelectedOption(Number.parseInt(event.target.value));
    }
    const foods = [
        {day:"Mon", value:1200},
        {day:"Tue", value:1430},
        {day:"Wed", value:980},
        {day:"Thr", value:11000},
        {day:"Fri", value:12000},
        {day:"Sat", value:13000},
        {day:"Sun", value:12500},
    ];
    const drinks = [
        {day:"Mon", value:2200},
        {day:"Tue", value:12030},
        {day:"Wed", value:8880},
        {day:"Thr", value:7000},
        {day:"Fri", value:8000},
        {day:"Sat", value:11000},
        {day:"Sun", value:9500},
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
                padding={{ top: 10, bottom: 20, right: 50, left: 70 }}
                domainPadding={30}
            >
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
                    axisLabelComponent={<VictoryLabel dy={-28}/>}
                />

                {/* ////////  Line chart for food orders and shadows  ///////// */}
                <VictoryLine
                    data={foods}
                    x="day"
                    y="value"
                    style={{
                        data:{
                            stroke:"#C026D344",
                            strokeLinecap:"round",
                            strokeWidth:"8px"
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
                            stroke:"#0284C744",
                            strokeLinecap:"round",
                            strokeWidth:"8px"
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
                        }
                    }}
                />

            </ResponsiveVictoryChart>

        </ChartContainer>
    );
}
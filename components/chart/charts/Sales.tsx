import ChartContainer from "../ChartContainer";
import {useState} from 'react';
import { VictoryChart } from "victory-chart";
import {VictoryBar,VictoryAxis,VictoryLabel} from 'victory'
import { VictoryTheme } from "victory-core";
import ResponsiveVictoryChart from "../../ResponsiveVictoryChart";

export default function SalesChart(){
    const [selectedOption, setSelectedOption] = useState<number>(1);
    const onSelectChange = (event:React.ChangeEvent<HTMLSelectElement>) =>{
        setSelectedOption(Number.parseInt(event.target.value));
    }

    const data = [
        {day:"Mon", value:1200},
        {day:"Tue", value:1430},
        {day:"Wed", value:980},
        {day:"Thr", value:11000},
        {day:"Fri", value:12000},
        {day:"Sat", value:13000},
        {day:"Sun", value:12500},
    ]
    return(
        <ChartContainer
          hasFilter={true}
          filterItems={[
            {key:1,text:"Last 7 days"},
            {key:2,text:"Last Month"},
            {key:3,text:"This Year"},
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
                <VictoryBar
                    barRatio={0.7}
                    style={{
                        data:{
                            fill:"rgb(74 222 128)"
                        }
                    }}
                    data={data}
                    x="day"
                    y="value"
                    labels={({ datum }) => datum.value}
                    labelComponent={<VictoryLabel renderInPortal dy={-20}/>}
                />
            </ResponsiveVictoryChart>
        </ChartContainer>   
    );
}
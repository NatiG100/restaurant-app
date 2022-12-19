import ChartContainer from "../ChartContainer";
import {useState} from 'react';
import { VictoryChart } from "victory-chart";
import {VictoryBar} from 'victory'
import { VictoryTheme } from "victory-core";
import ResponsiveVictoryChart from "../../ResponsiveVictoryChart";

interface SalesChartInterface {
    span: number,
}

export default function SalesChart(props:SalesChartInterface){
    const [selectedOption, setSelectedOption] = useState<number>(1);
    const onSelectChange = (event:React.ChangeEvent<HTMLSelectElement>) =>{
        setSelectedOption(Number.parseInt(event.target.value));
    }

    const data = [
        {day:1, value:1200},
        {day:2, value:1430},
        {day:3, value:980},
        {day:4, value:11000},
        {day:5, value:12000},
        {day:6, value:13000},
        {day:7, value:12500},
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
          span={props.span}
        >
            <ResponsiveVictoryChart
                padding={{ top: 10, bottom: 20, right: 50, left: 50 }}
            >
                <VictoryBar
                    style={{
                        data:{
                            backgroundColor:"red"
                        }
                    }}
                    data={data}
                    x="day"
                    y="value"
                    alignment="start"
                    animate={{
                        duration:2000,
                        onLoad:{duration:1000}
                    }}
                />
            </ResponsiveVictoryChart>
        </ChartContainer>   
    );
}
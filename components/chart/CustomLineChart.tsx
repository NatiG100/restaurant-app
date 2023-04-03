import { useEffect } from "react";
import { VictoryAxis, VictoryLabel, VictoryLine, VictoryScatter, VictoryTooltip } from "victory";
import { DOtW, MOtY } from "../../constants/constants";
import ResponsiveVictoryChart from "../ResponsiveVictoryChart";

export default function CustomLineChart ({data,color,selectedOption}:{data:{amount:number,date:string}[],color:string,selectedOption:number}){
    useEffect(()=>{console.log(data)},[data]);
    return(<>
    <ResponsiveVictoryChart
        padding={{ top: 0, bottom: 20, right: 50, left: 70 }}
        domainPadding={30} 
    >

        <VictoryAxis
            style={{
                tickLabels:{fill:"rgb(55 65 81)"},
                axis:{stroke:"rgb(55 65 81)"},
            }}
            tickFormat={(x:string,index:number) => {
                if(selectedOption===2||selectedOption===4){
                    return x;
                }else if(selectedOption===1){
                    const dates = data.map((d)=>(d.date));
                    return DOtW[dates.indexOf(x)]
                }else{
                    return MOtY[parseInt(x)-1];
                }
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

        <VictoryLine
            data={data}
            x="date"
            y="amount"
            style={{
                data:{
                    stroke:color+"22",
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
            data={data}
            x="date"
            y="amount"
            style={{
                data:{
                    stroke:"rgb(192 38 211)",
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
            data={data}
            x="date"
            y="amount"
            size={5}
            style={{
                data:{
                    fill:color,
                }
            }}
            
        />
    </ResponsiveVictoryChart>
    </>);
}
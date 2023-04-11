import { useEffect,Fragment } from "react";
import { VictoryAxis, VictoryLabel, VictoryLegend, VictoryLine, VictoryScatter, VictoryTooltip } from "victory";
import { DOtW, MOtY } from "../../constants/constants";
import ResponsiveVictoryChart from "../ResponsiveVictoryChart";

export default function CustomLineChart ({datas,colors,selectedOption,legend,drawPoints=true}:{
    legend?:{name:string,symbol:{fill:string}}[],
    datas:{_id:string,data:{amount:number,date:string}[]}[],
    colors:string[],
    selectedOption:number,
    drawPoints?:boolean,
}){
    console.log(datas[0])
    return(
    <ResponsiveVictoryChart
        padding={{ top: 0, bottom: 20, right: 50, left: 70 }}
        domainPadding={30} 
    >{legend&&
        <VictoryLegend x={125} y={-20}
            orientation="horizontal"
            symbolSpacer={5}
            gutter={20}
            data={legend}
        />}
        <VictoryAxis
            style={{
                tickLabels:{fill:"rgb(55 65 81)"},
                axis:{stroke:"rgb(55 65 81)"},
            }}
            tickFormat={(x:string,index:number) => {
                if(selectedOption===4){
                    return x;
                }else if(selectedOption===2){
                    return x
                }
                else if(selectedOption===1){
                    const dates = datas[0].data.map((d)=>(d.date));
                    // console.log(datas[0])
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
        {datas.map((data,index)=>{
            let color = colors[index];
            return(
                <VictoryLine
                    key={data._id}
                    interpolation={"basis"}
                    data={data.data}
                    x="date"
                    y="amount"
                    style={{
                        data:{
                            stroke:color+"37",
                            strokeLinecap:"round",
                            strokeWidth:"8px"
                        },
                        labels:{
                            fill:color,
                            fontSize:"15px",
                            fontWeight:"600"
                        }
                    }}
                />
            ) 
        })}
        {datas.map((data,index)=>{
            let color = colors[index];
            return(
                <VictoryLine
                    key={data._id}
                    interpolation={"basis"}
                    data={data.data}
                    x="date"
                    y="amount"
                    style={{
                        data:{
                            stroke:color,
                        },
                    }}
                />       
            )
        })}
        {drawPoints?datas.map((data,index)=>{
            let color = colors[index];
            return(
                <VictoryScatter
                    labels={({datum})=>datum.amount}
                    labelComponent={
                        <VictoryTooltip
                            flyoutWidth={95}
                            flyoutHeight={35}
                            cornerRadius={5}
                            pointerLength={40}
                            flyoutStyle={{
                                stroke: color,
                                strokeWidth: 2,
                                fill: "#FFFFFF"
                            }}
                            style={{
                                fill: "color",
                                fontSize: 14,
                                fontWeight: 500,
                                textAnchor: "middle"
                            }}
                        />
                    }
                    data={data.data}
                    x="date"
                    y="amount"
                    size={5}
                    style={{
                        data:{
                            fill:color,
                        }
                    }}
                    
                />
            );
        }):<></>}
    </ResponsiveVictoryChart>
    );
}
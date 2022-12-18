import React,{useRef} from "react";
import {VictoryChartProps, VictoryChart} from 'victory-chart'
import useSize from "../../hooks/useSize";

export default function ResponsiveVictoryChart(initialProps:React.ExoticComponent<VictoryChartProps>){
    const ref = useRef(null);
    const {width,height} = useSize(ref.current);
    const props = {
        ...initialProps,
        width,
        height,
    }

    return (
        <div className="w-full h-full" ref={ref}>
            <VictoryChart {...props} />
        </div>
    );
}
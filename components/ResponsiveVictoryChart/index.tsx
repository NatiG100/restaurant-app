import React,{useRef} from "react";
import {VictoryChartProps, VictoryChart} from 'victory-chart'
import useSize from "../../hooks/useSize";

export default function ResponsiveVictoryChart(initialProps:VictoryChartProps){
    const ref = useRef(null);
    const {width,height} = useSize(ref?.current);
    const props = {
        ...initialProps,
        width,
        height,
    }

    return (
        <div className="w-full h-full max-h-full" ref={ref}>
            <VictoryChart {...props} />
        </div>
    );
}
import ChartContainer from "../ChartContainer";
import {useState} from 'react';

interface SalesChartInterface {
    span: number,
}

export default function SalesChart(props:SalesChartInterface){
    const [selectedOption, setSelectedOption] = useState<number>(1);
    const onSelectChange = (event:React.ChangeEvent<HTMLSelectElement>) =>{
        setSelectedOption(Number.parseInt(event.target.value));
    }

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
          <p>Chart Placeholder</p>
        </ChartContainer>   
    );
}
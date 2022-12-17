interface ChartContainerInterface {
    title: string,
    hasFilter: boolean,
    filterItems: {key:number, text:string}[],
    chart: React.ReactNode,
    children: React.ReactNode,
}

export default function ChartContainer(props:ChartContainerInterface){
    return(
        <div className="p-5 rounded-md bg-white grid grid-rows-maxmax w-full shadow-custom-lg">
            <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="rounded-tl-sm rounded-bl-sm w-4 h-20 bg-green-200"></div>
                    <p className="text-gray-800">Sales</p>
                </div>
                <select>
                    {props.filterItems.map((items)=>(
                            <option key={items.key}>{items.text}</option>
                        ))
                    }
                </select>
            </div>
            {props.children}
        </div>
    );
}
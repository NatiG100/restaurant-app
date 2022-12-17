interface ChartContainerInterface {
    title: string,
    hasFilter: boolean,
    filterItems: {key:number, text:string}[],
    children: React.ReactNode,
}

export default function ChartContainer(props:ChartContainerInterface){
    return(
        <div className="p-5 rounded-lg bg-white grid grid-rows-maxmax w-full shadow-custom-lg gap-y-4">
            <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="rounded-tl-md rounded-bl-md w-4 h-8 bg-indigo-200"></div>
                    <p className="text-gray-800 font-bold text-lg">Sales</p>
                </div>
                <select className="focus:outline-none border border-indigo-400 p-1 rounded-md">
                    {props.filterItems.map((items)=>(
                            <option key={items.key} className="appearance-none py-6">
                                {items.text}
                            </option>
                        ))
                    }
                </select>
            </div>
            {props.children}
        </div>
    );
}
import Body from "../components/Body";
import ReactDataGrid, { Column,headerRenderer, HeaderRendererProps, Row, RowRendererProps } from "react-data-grid";
import { Key, useCallback, useMemo } from "react";

export enum status {
    pending,
    started,
    served,
    canceled
}
export interface OrderInterface{
    _id:string,
    date:string,
    totalCost:number,
    timeElapsed:string,
    status:status,
}


const gridStyle = {minHeight: 550}
const rows:OrderInterface[] = [
    {
        _id:"asdjkfjasfjksddk",
        date:"15/10/2012",
        totalCost:150,
        timeElapsed:"1h 20m",
        status:status.pending
    },
    {
        _id:"dfghsjmxcxvrtssr",
        date:"15/10/2012",
        totalCost:120,
        timeElapsed:"1h 20m",
        status:status.pending
    },
    {
        _id:"nsreygjdfmlfgou",
        date:"15/10/2012",
        totalCost:98,
        timeElapsed:"1h 20m",
        status:status.pending
    },
    {
        _id:"batrehnbsfsfgfd",
        date:"15/10/2012",
        totalCost:240,
        timeElapsed:"1h 20m",
        status:status.pending
    },
    {
        _id:"lpoiunmxijudjwop",
        date:"15/10/2012",
        totalCost:170,
        timeElapsed:"1h 20m",
        status:status.pending
    },
    {
        _id:"poiuijkadfcnvkal",
        date:"15/10/2012",
        totalCost:99,
        timeElapsed:"1h 20m",
        status:status.pending
    },
]

const columns: readonly Column<OrderInterface,unknown>[] = [
    {
        key:"_id",
        name:"ID",
        width:20,
        cellClass:(row)=>`inline`,
    },
    {
        key:"date",
        name:"Date",
        width:10,
        cellClass:"inline",
    },
    {
        key:"totalCost",
        name:"Total Cost",
        width:10,
        cellClass:"inline",
    },
    {
        key:"timeElapsed",
        name:"Time Elapsed",
        width:10,
        cellClass:"inline",
    },
    {
        key:"status",
        name:"Status",
        width:10,
        cellClass:"inline",
        // :({value}:{value:status})=>{
        //     return(
        //         <p
        //             className={`text-${
        //                 value===status.pending?"yellow":
        //                 value===status.started?"indigo":
        //                 value===status.served?"green":
        //                 value===status.canceled?"red":
        //                 "gray"
        //             }`}
        //         >{value}</p>
        //     );
        // }
    }
]
const RowRenderer = (key:Key, props:RowRendererProps<OrderInterface, unknown>)=>{
    return (
        <Row
            {...props}
            key={key}
            className={`
                w-full px-6 py-3 grid grid-cols-orders
                hover:bg-slate-50 bg-white cursor-default
                text-gray-500 text-lg rounded-lg text-ellipsis
            `}
        />
    );
}


export default function Orders(){
    const HeaderRenderer = (props:HeaderRendererProps<OrderInterface, unknown>)=>{
        return (
            <p className="text-red-600 w-max">{props.column.name}</p>
        );
    }
    const rowKeyGetter = (row: OrderInterface)=>{
        return row._id;
    }
    const columnRenderer = useMemo(() => {
        
        return columns.map((c) => {
            return { ...c, headerRenderer: HeaderRenderer };
        });
    },[columns]);
    return (
        <Body title="Orders">
            <div className="
                bg-white shadow-sm border border-indigo-100
                w-full h-max mt-12
            ">
                <ReactDataGrid
                    columns={columnRenderer}
                    rows={rows}
                    renderers={{
                        rowRenderer:RowRenderer,
                    }}
                    rowKeyGetter={rowKeyGetter}
                    rowHeight={100}
                    
                    
                />
            </div>
        </Body>
    );
}
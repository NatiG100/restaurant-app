import Body from "../components/Body";
import ReactDataGrid, { Column,headerRenderer, Row, RowRendererProps } from "react-data-grid";
import { Key, useCallback } from "react";

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
        width:200,
    },
    {
        key:"date",
        name:"Date",
        width:100,
    },
    {
        key:"totalCost",
        name:"Total Cost",
        width:100,
    },
    {
        key:"timeElapsed",
        name:"Time Elapsed",
        width:100,
    },
    {
        key:"status",
        name:"Status",
        width:100,
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
            className={`
                w-full grid px-2 py-3 
                hover:bg-slate-50 bg-white cursor-default
                text-indigo-500 text-lg rounded-lg text-ellipsis
            `}
        />
    );
}
export default function Orders(){
    return (
        <Body title="Orders">
            <div className="
                p-6 bg-white shadow-sm border border-indigo-100
                w-full h-max mt-12
            ">
                <ReactDataGrid
                    columns={columns}
                    rows={rows}
                    renderers={{
                        rowRenderer:RowRenderer,
                    }}
                    
                />
            </div>
        </Body>
    );
}
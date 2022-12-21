import Body from "../components/Body";
import { Key, useState } from "react";
import This from "ag-grid-community"
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

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
];

export default function Orders(){
    const [rowData] = useState([
        {make: "Toyota", model: "Celica", price: 35000},
        {make: "Ford", model: "Mondeo", price: 32000},
        {make: "Porsche", model: "Boxster", price: 72000}
    ]);
    const [columnDefs] = useState([
        { field: 'make' },
        { field: 'model' },
        { field: 'price' }
    ])
    return (
        <Body title="Orders" className="h-full">
            <div className="ag-theme-alpine" style={{height: "100%", width: "100%"}}>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}>
                </AgGridReact>
            </div>
        </Body>
    );
}
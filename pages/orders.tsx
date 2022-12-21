import Body from "../components/Body";
import { Key, useState } from "react";
import This from "ag-grid-community"
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColumnFormat } from "ag-grid-community/dist/lib/main";

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



const statusColumnClass = (param:any)=>(
    param?.value==="pending"?"text-yellow-600 bg-yellow-50":
    param?.value==="started"?"text-indigo-600 bg-indigo-50":
    param?.value==="served"?"text-green-600 bg-green-50":
    param?.value==="canceled"?"text-red-600 bg-red-50":
    "text-gray-600"
);
export default function Orders(){
    const [rowData] = useState([
        {_id:"nakdjfjeial",date: "10/10/2015", totalCost: 4000, timeElapsed: "1hr 10min",tableNumber:"A10",status:"pending"},
        {_id:"nsdknvfkkcd",date: "10/10/2015", totalCost: 4000, timeElapsed: "1hr 10min",tableNumber:"A10",status:"pending"},
        {_id:"alksdfj,dfd",date: "10/10/2015", totalCost: 4000, timeElapsed: "1hr 10min",tableNumber:"A10",status:"started"},
        {_id:"ueiopaisdfx",date: "10/10/2015", totalCost: 4000, timeElapsed: "1hr 10min",tableNumber:"A10",status:"canceled"},
        {_id:"nalskjsdoto",date: "10/10/2015", totalCost: 4000, timeElapsed: "1hr 10min",tableNumber:"A10",status:"served"},
        {_id:"abegkielmdf",date: "10/10/2015", totalCost: 4000, timeElapsed: "1hr 10min",tableNumber:"A10",status:"served"},
    ]);
    const [columnDefs] = useState([
        { field: '_id',headerName:"ID" },
        { field: 'date',headerName:"Date", type: ['dateColumn', 'nonEditableColumn'] },
        { field: 'totalCost',headerName:"Total Cost" },
        { field: 'timeElapsed',headerName:"Time Elapsed" },
        { field: 'tableNumber',headerName:"Table Number" },
        { field: 'status',headerName:"Status",cellClass:statusColumnClass },
        { field: 'status',headerName:"Actions",cellClass:statusColumnClass },
    ])
    return (
        <Body title="Orders" className="h-full">
            <div className="ag-theme-alpine h-full w-full">
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                >
                </AgGridReact>
            </div>
        </Body>
    );
}
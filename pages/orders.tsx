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


const OrderTableActionRow = (params:any)=>{
    return(
        <div className="flex gap-4 font-semibold w-max">
            <button className="
                border border-indigo-700 rounded-lg 
                w-24 m-1 text-indigo-700 bg-indigo-100
                hover:bg-indigo-700 hover:text-indigo-50
                transition-all
            ">View</button>
            {
                params?.value==="pending"?<button className="
                border border-orange-700 rounded-lg 
                w-24 m-1 text-orange-700 bg-orange-100
                hover:bg-orange-700 hover:text-orange-50
                transition-all
            ">Start</button>:
                params?.value==="started"?<button className="
                border border-green-700 rounded-lg 
                w-24 m-1 text-green-700 bg-green-100
                hover:bg-green-700 hover:text-green-50
                transition-all
            ">Ready</button>:<></>
            }
        </div>
    );
}
const statusColumnClass = (param:any)=>(
    param?.value==="pending"?"text-yellow-600 text-lg":
    param?.value==="started"?"text-indigo-600 text-lg":
    param?.value==="served"?"text-green-600 text-lg":
    param?.value==="canceled"?"text-red-600 text-lg":
    "text-gray-600"
);
const headerClass = "text-gray-700 text-base";
const cellClass = "text-gray-600 text-base";
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
        { 
            field: '_id',
            headerName:"ID",
            headerClass:headerClass,
            cellClass:cellClass,
            filter: 'agTextColumnFilter',
        },
        { 
            field: 'date',
            headerName:"Date", 
            type: ['dateColumn', 'nonEditableColumn'],
            filter: 'agDateColumnFilter',
            headerClass:headerClass,
            cellClass:cellClass,
            width:150  
        },
        { 
            field: 'totalCost',
            headerName:"Total Cost",
            headerClass:headerClass,
            cellClass:cellClass,
            width:150  
        },
        { 
            field: 'timeElapsed',
            headerName:"Time Elapsed",
            headerClass:headerClass,
            cellClass:cellClass,
            width:150  
        },
        { 
            field: 'tableNumber',
            headerName:"Table Number",
            headerClass:headerClass,
            cellClass:cellClass,
            width:150,
            filter: 'agTextColumnFilter',
        },
        { 
            field: 'status',
            headerName:"Status",
            cellClass:statusColumnClass,
            width:130,
            filter: 'agTextColumnFilter',
        },
        { 
            field: 'status',
            headerName:"Actions",
            cellRenderer:OrderTableActionRow,
            width:350 
        },
    ])
    return (
        <Body title="Orders" className="h-full">
            <div className="ag-theme-alpine h-full w-full">
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    rowHeight={55}
                    rowStyle={{width:"100%"}}
                >
                </AgGridReact>
            </div>
        </Body>
    );
}
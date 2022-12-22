import {useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { columnDefs, TypeOrder } from "../components/TableComponents/order";


export default function Orders(){
    const gridRef = useRef(null);
    const [rowData] = useState<TypeOrder[]>([
        {_id:"nakdjfjeial",date: "10/10/2015", totalCost: 4000, timeElapsed: "1hr 10min",tableNumber:"A10",status:"Pending"},
        {_id:"nsdknvfkkcd",date: "10/10/2015", totalCost: 4000, timeElapsed: "1hr 10min",tableNumber:"A10",status:"Pending"},
        {_id:"alksdfj,dfd",date: "10/10/2015", totalCost: 4000, timeElapsed: "1hr 10min",tableNumber:"A10",status:"Started"},
        {_id:"ueiopaisdfx",date: "10/10/2015", totalCost: 4000, timeElapsed: "1hr 10min",tableNumber:"A10",status:"Cancelled"},
        {_id:"nalskjsdoto",date: "10/10/2015", totalCost: 4000, timeElapsed: "1hr 10min",tableNumber:"A10",status:"Served"},
        {_id:"abegkielmdf",date: "10/10/2015", totalCost: 4000, timeElapsed: "1hr 10min",tableNumber:"A10",status:"Served"},
    ]);

    return (
            <div className="ag-theme-alpine h-full w-full">
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    rowHeight={55}
                    rowStyle={{width:"100%"}}
                    overlayLoadingTemplate={
                        '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>'
                    }
                    rowDragManaged={true}
                    containerStyle={{
                        border:"0px solid #fff0"
                    }}
                >
                </AgGridReact>
            </div>
    );
}
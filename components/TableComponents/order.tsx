import { CellClassParams, ColDef, ICellRendererParams } from "ag-grid-community";
import Button from "../UIElements/Button";

export interface TypeItem{
    img: string,
    name: string,
    cost: number,
    amount: number,
}
export interface TypeOrder{
    _id:string,
    date:string,
    totalCost:number,
    timeElapsed:string,
    tableNumber:string,
    items: TypeItem[],
    status:"Served"|"Pending"|"Cancelled"|"Started"
}

export const OrderTableActionRow = (params: ICellRendererParams<TypeOrder>)=>{
    return(
        <div className="flex gap-4 font-semibold w-max">
            <Button type="outline" className="w-24" onClick={()=>{params.context?.setSelectedOrder(params.data)}}>
                View
            </Button>
            {
                params?.value==="Pending"?
                    <Button type="outline" className="w-24" color="warning">
                        Start
                    </Button>
                :
                params?.value==="Started"?
                    <Button type="outline" className="w-24" color="success">
                        Ready
                    </Button>
                :<></>
            }
        </div>
    );
}

const statusColumnClass = (param:CellClassParams<TypeOrder>)=>(
    param?.value==="Pending"?"text-yellow-600 text-lg":
    param?.value==="Started"?"text-indigo-600 text-lg":
    param?.value==="Served"?"text-green-600 text-lg":
    param?.value==="Cancelled"?"text-red-600 text-lg":
    "text-gray-600"
);
const headerClass:string = "text-gray-700 text-base";
const cellClass:string = "text-gray-600 text-base";


export const columnDefs:ColDef<TypeOrder>[] = [
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
        filter: 'agDateColumnFilter',
        headerClass:headerClass,
        cellClass:cellClass,
        width:150,
        sortable:true,
    },
    { 
        field: 'totalCost',
        headerName:"Total Cost",
        headerClass:headerClass,
        cellClass:cellClass,
        width:150,
        sortable:true,  
    },
    { 
        field: 'timeElapsed',
        headerName:"Time Elapsed",
        headerClass:headerClass,
        cellClass:cellClass,
        width:150,
        sortable:true  
    },
    { 
        field: 'tableNumber',
        headerName:"Table Number",
        headerClass:headerClass,
        cellClass:cellClass,
        width:160,
        filter: 'agTextColumnFilter',
        sortable:true,
    },
    { 
        field: 'status',
        headerName:"Status",
        cellClass:statusColumnClass,
        width:150,
        filter: 'agTextColumnFilter',
        sortable:true,
        rowDrag:true
    },
    { 
        field: 'status',
        headerName:"Actions",
        cellRenderer:OrderTableActionRow,
        width:300 
    },
];
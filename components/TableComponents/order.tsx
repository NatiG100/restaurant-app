import { CellClassParams, ColDef, ICellRendererParams } from "ag-grid-community";
import useTimeCounter from "../../hooks/useTimeCounter";
import { formatDate } from "../../utils/date";
import Button from "../UIElements/Button";

export interface TypeItem{
    img: string,
    name: string,
    cost: number,
    amount: number,
    itemId: string,
}
export interface TypeOrder{
    id:string,
    date:string,
    totalCost:number,
    timeElapsed:string,
    tableNumber:string,
    items: TypeItem[],
    status:"Served"|"Pending"|"Cancelled"|"Started"
}

export const OrderTableActionRow = (params: ICellRendererParams<TypeOrder>)=>{
    const {requestStatusUpdate:changeStatus,isStatusUpdateLoading:isLoading} = params.context;
    return(
        <div className="flex gap-4 font-semibold w-max">
            <Button type="outline" className="w-24" onClick={()=>{params.context?.setSelectedOrder(params.data)}}>
                View
            </Button>
            {
                params?.value==="Pending"?
                    <Button 
                        type="outline" 
                        className="w-24" 
                        color="warning"
                        disabled={isLoading}
                        onClick={()=>{changeStatus({status:"Started",id:params.data?.id})}}
                    >
                        Start
                    </Button>
                :
                params?.value==="Started"?
                    <Button 
                        type="outline" 
                        className="w-24" 
                        color="success"
                        disabled={isLoading}
                        onClick={()=>{changeStatus({status:"Served",id:params.data?.id})}}
                    >
                        Ready
                    </Button>
                :<></>
            }
        </div>
    );
}
export const TimeElapsed = (params: ICellRendererParams<TypeOrder>)=>{
    const {secs,minutes} = useTimeCounter(parseInt(params.data?.timeElapsed as string));
    return(
        <p>{minutes} Mins - {secs} Secs</p>
    );
}
const OrderDate = (params:ICellRendererParams<TypeOrder>)=>{
    return(
        <p>{formatDate(new Date(params.data?.date as string))}</p>
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
        field: 'id',
        headerName:"ID",
        headerClass:headerClass,
        cellClass:cellClass,
        filter: 'agTextColumnFilter',
    },
    { 
        field: 'date',
        headerName:"Date(yyyy-mm-dd)",
        filter: 'agDateColumnFilter',
        cellRenderer:OrderDate,
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
        cellRenderer:TimeElapsed,
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
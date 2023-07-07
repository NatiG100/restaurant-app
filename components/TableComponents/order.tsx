import { CellClassParams, ColDef, ICellRendererParams } from "ag-grid-community";
import useTimeCounter from "../../hooks/useTimeCounter";
import { formatDate } from "../../utils/date";
import Button from "../UIElements/Button";
import { CellRenderer } from "./foodCategories";

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
        <div className="flex gap-4 font-semibold w-max h-14 items-center my-2">
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
    const shouldCount = !(params.data?.status=="Cancelled"||params.data?.status=="Served");
    const {secs,minutes} = useTimeCounter(parseInt(params.data?.timeElapsed as string),shouldCount);
    return(
        <p className="h-14 flex items-center my-2">{minutes} Mins - {secs} Secs</p>
    );
}
const OrderDate = (params:ICellRendererParams<TypeOrder>)=>{
    return(
        <p className="h-14 flex items-center my-2">{formatDate(new Date(params.data?.date as string))}</p>
    );
}
const statusColumnClass = (param:CellClassParams<TypeOrder>)=>(
    param?.value==="Pending"?"text-yellow-600 text-lg h-14 flex items-center ":
    param?.value==="Started"?"text-indigo-600 text-lg h-14 flex items-center":
    param?.value==="Served"?"text-green-600 text-lg h-14 flex items-center ":
    param?.value==="Cancelled"?"text-red-600 text-lg h-14 flex items-center":
    "text-gray-600 h-14 flex items-center"
);
const headerClass:string = "text-gray-700 text-base";
const cellClass:string = "text-gray-600 text-base";

export const defaultColDef:ColDef={
    autoHeight:true,
    suppressSizeToFit:true,
}
export const columnDefs:ColDef<TypeOrder>[] = [
    {
        checkboxSelection:true,
        headerCheckboxSelection:true,
        width:60,
        resizable:false,
        autoHeight:false,
        cellClass:"w-full justify-center flex items-center my-2 py-2"
    },
    { 
        field: 'id',
        headerName:"ID",
        headerClass:headerClass,
        cellClass:cellClass,
        filter: 'agTextColumnFilter',
        cellRenderer:CellRenderer()
    },
    { 
        field: 'date',
        headerName:"Date(yyyy-mm-dd)",
        filter: 'agDateColumnFilter',
        cellRenderer:OrderDate,
        width:150,
        sortable:true,
        headerClass:headerClass,
    },
    { 
        field: 'totalCost',
        headerName:"Total Cost",
        headerClass:headerClass,
        cellClass:cellClass,
        width:150,
        sortable:true,  
        cellRenderer:CellRenderer()
    },
    { 
        field: 'timeElapsed',
        headerName:"Time Elapsed",
        cellRenderer:TimeElapsed,
        width:150,
        sortable:true,
        headerClass:headerClass,
    },
    { 
        field: 'tableNumber',
        headerName:"Table Number",
        headerClass:headerClass,
        cellClass:cellClass,
        width:160,
        filter: 'agTextColumnFilter',
        sortable:true,
        cellRenderer:CellRenderer()
    },
    { 
        field: 'status',
        headerName:"Status",
        cellClass:statusColumnClass,
        width:150,
        filter: 'agTextColumnFilter',
        sortable:true,
        rowDrag:true,
        headerClass:headerClass,
        cellRenderer:CellRenderer()
    },
    { 
        field: 'status',
        headerName:"Actions",
        cellRenderer:OrderTableActionRow,
        width:300,
        headerClass:headerClass,
        suppressSizeToFit:false,
    },
];
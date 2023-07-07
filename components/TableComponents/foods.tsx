import { CellClassParams, ColDef, ICellRendererParams } from "ag-grid-community";
import Image from "next/image";
import baseURL from "../../constants/BASE_URL";
import Auth from "../hoc/Auth";
import Button from "../UIElements/Button";
import { CellRenderer } from "./foodCategories";

export interface TypeFood{
    id:string,
    categoryId:string,
    name:string,
    description:string,
    status:"Suspended"|"Active",
    img:string,
    imgs:string[],
    created:string,
    updated:string,
    createdBy:string,
    cost:number,
    totalSale:number,
}

const FoodsActionCell = (params:ICellRendererParams<TypeFood>)=>{
    const {isStatusUpdateLoading:loading, requestStatusUpdate:changeStatus} = params.context;
    return(
        <div className="flex gap-4 font-semibold w-max items-center py-2">
            <Button 
                type="outline" 
                className="w-24"
                onClick={()=>{
                    params.context?.setSelectedFood(params.data);
                }}
            >
            View</Button>
            <Auth requiredPrevilage="Manage Items">
                {
                    params.data?.status==="Active"?
                        <Button 
                            type="outline" 
                            color="error" 
                            className="w-24"
                            disabled={loading}
                            onClick={()=>{changeStatus({status:"Suspended",id:params.data?.id})}}
                        >Deactivate</Button>:
                        <Button 
                            type="outline" 
                            color="success" 
                            className="w-24"
                            disabled={loading}
                            onClick={()=>{changeStatus({status:"Active",id:params.data?.id})}}
                        >Activate</Button>
                }
            </Auth>
        </div>
    );
}
const FoodsAvatarCell = (params:ICellRendererParams<TypeFood>)=>{
    return(
        <div className="flex justify-center items-center py-2 my-auto">
            <img
                height={200}
                width={200}
                src={baseURL+params.data?.img||""}
                alt={params.data?.name||""}
                className="rounded-full object-cover h-14 w-14"
            />
        </div>
    );
}

const statusColumnClass = (params:CellClassParams<TypeFood>)=>(
    params.data?.status==="Active"?"h-14 flex items-center my-2 py-2 text-green-600 text-base":
    params.data?.status==="Suspended"?"h-14 flex items-center my-2 py-2 text-red-600  text-base":
    "h-14 flex items-center my-2 py-2 text-gray-600  text-base" 
)

const headerClass:string = "text-gray-700 text-base";
const cellClass:string = "text-gray-600 text-base self-center";

export const defaultColDef:ColDef={
    resizable:true,
    autoHeight:true,
    headerClass,
    suppressSizeToFit:true,
}

export const columnDefs:ColDef<TypeFood>[] = [
    {
        checkboxSelection:true,
        headerCheckboxSelection:true,
        width:60,
        resizable:false,
        autoHeight:false,
        cellClass:"w-full justify-center flex items-center my-2 py-2"
    },
    {
        field:'img',
        headerName:"Avatar",
        width:122,
        resizable:false,
        cellRenderer:FoodsAvatarCell
    },
    { 
        field: 'id',
        headerName:"ID",
        cellClass:cellClass,
        filter: 'agTextColumnFilter',
        cellRenderer:CellRenderer(false)
    },
    {
        field: 'categoryId',
        headerName:"Category ID",
        cellClass:cellClass,
        filter: 'agTextColumnFilter',
        width:100,
        cellRenderer:CellRenderer(false)
    },
    { 
        field: 'name',
        headerName:"Name",
        cellClass:cellClass,
        width:150,
        sortable:true,  
        cellRenderer:CellRenderer(true)
    },
    
    { 
        field: 'totalSale',
        headerName:"Total Sale",
        cellClass:cellClass,
        width:120,
        filter: 'agTextColumnFilter',
        sortable:true,
        cellRenderer:CellRenderer(false)
    },
    {
        field:'createdBy',
        headerName: "Created By",
        filter: 'agTextColumnFilter',
        cellClass:cellClass,
        width: 150,
        cellRenderer:CellRenderer(false)
    },
    { 
        field: 'created',
        headerName:"Created",
        filter: 'agDateColumnFilter',
        cellClass:cellClass,
        width:150,
        sortable:true,
        cellRenderer:CellRenderer(false,true)
    },
    { 
        field: 'updated',
        headerName:"Updated",
        filter: 'agDateColumnFilter',
        cellClass:cellClass,
        width:150,
        sortable:true,
        cellRenderer:CellRenderer(false,true)
    },
    {
        field: 'cost',
        headerName: 'Cost',
        filter: 'agTextColumnFilter',
        sortable: true,
        width: 100,
        cellRenderer:CellRenderer(false)
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
        cellRenderer:FoodsActionCell,
        suppressSizeToFit:false,
        resizable:false,
    },
];
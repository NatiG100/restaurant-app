import { CellClassParams, ColDef, ICellRendererParams } from "ag-grid-community"
import Image from "next/image";
import baseURL from "../../constants/BASE_URL";
import Auth from "../hoc/Auth";
import Button from "../UIElements/Button";
import { CellRenderer } from "./foodCategories";

export interface TypeDrinkCategory{
    id:string,
    name:string,
    description:string,
    img:string,
    drinkCount:number,
    created:string,
    updated:string,
    status:"Suspended"|"Active",
}

const DrinkCategoriesActionCell = (params:ICellRendererParams<TypeDrinkCategory>)=>{
    const loading = params.context.isStatusUpdateLoading;
    const changeStatus = params.context.requestStatusUpdate;
    return(
        <div className="flex gap-4 font-semibold w-max items-center py-2">
            <Button 
                type="outline" 
                className="w-24"
                onClick={()=>{params.context?.setSelectedDrinkCategory(params.data)}}
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
                            onClick={()=>changeStatus({id:params.data?.id,status:"Suspended"})}
                        >Deactivate</Button>:
                        <Button 
                            type="outline" 
                            color="success" 
                            className="w-24"
                            disabled={loading}
                            onClick={()=>changeStatus({id:params.data?.id,status:"Active"})}

                        >Activate</Button>
                }
            </Auth>
        </div>
    );
}
const DrinkCategoriesAvatarCell = (params:ICellRendererParams<TypeDrinkCategory>)=>{
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
const DrinkCategoriesDescriptionCell = (params:ICellRendererParams<TypeDrinkCategory>)=>{
    return(
        <div className="w-full max-h-24 overflow-y-auto">
            <p className="text-sm p-2 text-gray-600  leading-4">{params.data?.description}</p>
        </div>
    );
}

const statusColumnClass = (params:CellClassParams<TypeDrinkCategory>)=>(
    params.data?.status==="Active"?"h-14 flex items-center my-2 py-2  text-green-600 text-base":
    params.data?.status==="Suspended"?"h-14 flex items-center my-2 py-2 text-red-600  text-base":
    "h-14 flex items-center my-2 py-2 text-gray-600  text-base" 
)

const headerClass:string = "text-gray-700 text-base";
const cellClass:string = "text-gray-600 text-base self-center cursor-pointer";

export const defaultColDef:ColDef={
    resizable:true,
    autoHeight:true,
    headerClass,
    suppressSizeToFit:true,
}

export const columnDefs:ColDef<TypeDrinkCategory>[] = [
    {
        checkboxSelection:true,
        headerCheckboxSelection:true,
        width:60,
        resizable:false,
        autoHeight:false,
        cellClass:"w-full justify-center flex items-center my-2 py-2",
        lockPosition:'left',
    },
    {
        field:'img',
        headerName:"Avatar",
        width:122,
        resizable:false,
        cellRenderer:DrinkCategoriesAvatarCell
    },
    { 
        field: 'id',
        headerName:"ID",
        cellClass:cellClass,
        filter: 'agTextColumnFilter',
        cellRenderer:CellRenderer()
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
        field: 'drinkCount',
        headerName:"Drink Count",
        cellClass:cellClass,
        width:120,
        filter: 'agTextColumnFilter',
        sortable:true,
        cellRenderer:CellRenderer()
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
        cellRenderer:DrinkCategoriesActionCell,
       suppressSizeToFit:false,
       resizable:false,
    },
];
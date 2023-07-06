import { CellClassParams, ColDef, ICellRendererParams, IHeaderParams } from "ag-grid-community";
import Image from "next/image";
import React from "react";
import baseURL from "../../constants/BASE_URL";
import Auth from "../hoc/Auth";
import Button from "../UIElements/Button";
import moment from "moment";

export interface TypeFoodCategory{
    id: string,
    name: string,
    description: string,
    img: string,
    foodCount: number,
    created: string,
    updated: string,
    status:"Suspended"|"Active",
}

const FoodCategoriesActionCell = (params:ICellRendererParams<TypeFoodCategory>)=>{
    const handleViewClicked = (event:React.MouseEvent<HTMLButtonElement>)=>{
        event.stopPropagation();
        params.context?.setSelectedFoodCategory(params.data);
    }
    const loading = params.context.isStatusUpdateLoading;
    const changeStatus = params.context.requestStatusUpdate;
    return(
        <div className="flex gap-4 font-semibold w-max items-center py-2">
            <Button 
                type="outline" 
                className="w-24" 
                onClick={handleViewClicked}
            >View</Button>
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
const FoodCategoriesAvatarCell = (params:ICellRendererParams<TypeFoodCategory>)=>{
    return(
        <div className="flex justify-center items-center py-2 my-auto">
            <img
                height={100}
                width={100}
                src={baseURL+params.data?.img||""}
                alt={params.data?.name||""}
                className="rounded-full object-cover h-14 w-14"
            />
        </div>
    );
}


const statusColumnClass = (params:CellClassParams<TypeFoodCategory>)=>(
    params.data?.status==="Active"?"h-14 flex items-center my-2 py-2 text-green-600 text-base":
    params.data?.status==="Suspended"?"flex items-center my-2 py-2 text-red-600  text-base":
    "flex items-center my-2 py-2 text-gray-600  text-base" 
)

const headerClass:string = "text-gray-600 text-base font-normal font-[500]";
const cellClass:string = "text-gray-600 text-base self-center cursor-pointer";

export const defaultColDef:ColDef={
    resizable:true,
    autoHeight:true,
    headerClass,
    cellStyle: {
        justify:"center"
    }
}
export const CellRenderer = (bold?:boolean,isDate?:boolean)=>(params:ICellRendererParams<TypeFoodCategory>)=>{
    return(
        <div className=" w-full h-14 flex items-center my-2">
            <p className={`align-center w-full  ${bold&&"font-bold text-gray-700"}`}>{isDate?(moment(params.value).calendar()||'   -  '):(params.value||'   -   ')}</p>
        </div>
    );
}
export const columnDefs:ColDef<TypeFoodCategory>[] = [
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
        width:100,
        resizable:false,
        cellRenderer:FoodCategoriesAvatarCell
    },
    { 
        field: 'id',
        headerName:"ID",
        cellClass:cellClass,
        filter: 'agTextColumnFilter',
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
        field: 'foodCount',
        headerName:"Drink Count",
        cellClass:cellClass,
        width:120,
        filter: 'agTextColumnFilter',
        sortable:true,
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
        cellRenderer:FoodCategoriesActionCell,
    }
];
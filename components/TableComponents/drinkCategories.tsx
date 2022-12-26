import { CellClassParams, ColDef, ICellRendererParams } from "ag-grid-community"
import Image from "next/image";
import Button from "../UIElements/Button";

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
    return(
        <div className="flex gap-4 font-semibold w-max">
                    <Button type="outline" className="w-24">View</Button>
            {
                params.data?.status==="Active"?
                    <Button type="outline" color="error" className="w-24">Deactivate</Button>:
                    <Button type="outline" color="success" className="w-24">Activate</Button>
            }
        </div>
    );
}
const DrinkCategoriesAvatarCell = (params:ICellRendererParams<TypeDrinkCategory>)=>{
    return(
        <div className="flex justify-center items-center py-2 my-auto">
            <Image
                height={200}
                width={200}
                src={params.data?.img||""}
                alt={params.data?.name||""}
                className="rounded-full object-cover h-20 w-20 ring ring-indigo-700/20"
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
    params.data?.status==="Active"?"text-green-600 text-base":
    params.data?.status==="Suspended"?"text-red-600  text-base":
    "text-gray-600  text-base" 
)

const headerClass:string = "text-gray-700 text-base";
const cellClass:string = "text-gray-600 text-base self-center cursor-pointer";

export const defaultColDef:ColDef={
    resizable:true,
    autoHeight:true,
    headerClass
}

export const columnDefs:ColDef<TypeDrinkCategory>[] = [
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
    },
    { 
        field: 'name',
        headerName:"Name",
        cellClass:cellClass,
        width:150,
        sortable:true,  
    },
    { 
        field: 'description',
        headerName:"Description",
        cellRenderer:DrinkCategoriesDescriptionCell,
        width:200,
        wrapText:true,
    },
    { 
        field: 'drinkCount',
        headerName:"Drink Count",
        cellClass:cellClass,
        width:120,
        filter: 'agTextColumnFilter',
        sortable:true,
    },
    { 
        field: 'created',
        headerName:"Created",
        filter: 'agDateColumnFilter',
        cellClass:cellClass,
        width:150,
        sortable:true,
    },
    { 
        field: 'updated',
        headerName:"Updated",
        filter: 'agDateColumnFilter',
        cellClass:cellClass,
        width:150,
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
        cellRenderer:DrinkCategoriesActionCell,
        width:300 
    },
];
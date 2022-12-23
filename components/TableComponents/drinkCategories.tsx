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
            {
                params.data?.status==="Active"?
                    <Button type="outline" color="error">Deactivate</Button>:
                    <Button type="outline" color="success">Activate</Button>
            }
        </div>
    );
}
const DrinkCategoriesAvatarCell = (params:ICellRendererParams<TypeDrinkCategory>)=>{
    return(
        <div className="h-full w-full flex justify-center items-center">
            <Image
                height={200}
                width={200}
                src={params.data?.img||""}
                alt={params.data?.name||""}
                className="rounded-md object-cover"
            />
        </div>
    );
}

const statusColumnClass = (params:CellClassParams<TypeDrinkCategory>)=>(
    "text-lg "+params.data?.status==="Active"?"text-green-600":
    params.data?.status==="Suspended"?"text-red-600":
    "text-gray-600" 
)

const headerClass:string = "text-gray-700 text-base";
const cellClass:string = "text-gray-600 text-base";

export const columnDefs:ColDef<TypeDrinkCategory>[] = [
    { 
        field: 'id',
        headerName:"ID",
        headerClass:headerClass,
        cellClass:cellClass,
        filter: 'agTextColumnFilter',
    },
    {
        field:'img',
        headerName:"Avatar",
        headerClass:headerClass,
        cellClass:cellClass,
        width:120,
        cellRenderer:DrinkCategoriesAvatarCell
    },
    { 
        field: 'name',
        headerName:"Name",
        headerClass:headerClass,
        cellClass:cellClass,
        width:150,
        sortable:true,  
    },
    { 
        field: 'description',
        headerName:"Description",
        headerClass:headerClass,
        cellClass:cellClass,
        width:200,
    },
    { 
        field: 'drinkCount',
        headerName:"Drink Count",
        headerClass:headerClass,
        cellClass:cellClass,
        width:120,
        filter: 'agTextColumnFilter',
        sortable:true,
    },
    { 
        field: 'created',
        headerName:"Created",
        filter: 'agDateColumnFilter',
        headerClass:headerClass,
        cellClass:cellClass,
        width:150,
        sortable:true,
    },
    { 
        field: 'updated',
        headerName:"Updated",
        filter: 'agDateColumnFilter',
        headerClass:headerClass,
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
import { CellClassParams, ColDef, ICellRendererParams } from "ag-grid-community";
import Image from "next/image";
import Button from "../UIElements/Button";

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
    return(
        <div className="flex gap-4 font-semibold w-max">
                    <Button 
                        type="outline" 
                        className="w-24"
                        onClick={()=>{
                            params.context?.setSelectedFood(params.data);
                        }}
                    >
                    View</Button>
            {
                params.data?.status==="Active"?
                    <Button type="outline" color="error" className="w-24">Deactivate</Button>:
                    <Button type="outline" color="success" className="w-24">Activate</Button>
            }
        </div>
    );
}
const FoodsAvatarCell = (params:ICellRendererParams<TypeFood>)=>{
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
const FoodsDescriptionCell = (params:ICellRendererParams<TypeFood>)=>{
    return(
        <div className="w-full max-h-24 overflow-y-auto">
            <p className="text-sm p-2 text-gray-600  leading-4">{params.data?.description}</p>
        </div>
    );
}

const statusColumnClass = (params:CellClassParams<TypeFood>)=>(
    params.data?.status==="Active"?"text-green-600 text-base":
    params.data?.status==="Suspended"?"text-red-600  text-base":
    "text-gray-600  text-base" 
)

const headerClass:string = "text-gray-700 text-base";
const cellClass:string = "text-gray-600 text-base self-center";

export const defaultColDef:ColDef={
    resizable:true,
    autoHeight:true,
    headerClass
}

export const columnDefs:ColDef<TypeFood>[] = [
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
    },
    {
        field: 'categoryId',
        headerName:"Category ID",
        cellClass:cellClass,
        filter: 'agTextColumnFilter',
        width:100,
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
        cellRenderer:FoodsDescriptionCell,
        width:200,
        wrapText:true,
    },
    { 
        field: 'totalSale',
        headerName:"Total Sale",
        cellClass:cellClass,
        width:120,
        filter: 'agTextColumnFilter',
        sortable:true,
    },
    {
        field:'createdBy',
        headerName: "Created By",
        filter: 'agTextColumnFilter',
        cellClass:cellClass,
        width: 150,
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
        field: 'cost',
        headerName: 'Cost',
        filter: 'agTextColumnFilter',
        sortable: true,
        width: 100,
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
        width:300 
    },
];
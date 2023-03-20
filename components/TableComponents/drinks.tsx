import { CellClassParams, ColDef, ICellRendererParams } from "ag-grid-community";
import Image from "next/image";
import baseURL from "../../constants/BASE_URL";
import Auth from "../hoc/Auth";
import Button from "../UIElements/Button";

export interface TypeDrink{
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

const DrinksActionCell = (params:ICellRendererParams<TypeDrink>)=>{
    const {isStatusUpdateLoading:loading, requestStatusUpdate:changeStatus} = params.context;
    return(
        <div className="flex gap-4 font-semibold w-max">
            <Button 
                type="outline" 
                className="w-24"
                onClick={()=>{
                    params.context?.setSelectedDrink(params.data);
                }}
            >View</Button>
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
const DrinksAvatarCell = (params:ICellRendererParams<TypeDrink>)=>{
    return(
        <div className="flex justify-center items-center py-2 my-auto">
            <Image
                height={200}
                width={200}
                src={baseURL+params.data?.img||""}
                alt={params.data?.name||""}
                className="rounded-full object-cover h-20 w-20 ring ring-indigo-700/20"
            />
        </div>
    );
}
const DrinksDescriptionCell = (params:ICellRendererParams<TypeDrink>)=>{
    return(
        <div className="w-full max-h-24 overflow-y-auto">
            <p className="text-sm p-2 text-gray-600  leading-4">{params.data?.description}</p>
        </div>
    );
}

const statusColumnClass = (params:CellClassParams<TypeDrink>)=>(
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

export const columnDefs:ColDef<TypeDrink>[] = [
    {
        field:'img',
        headerName:"Avatar",
        width:122,
        resizable:false,
        cellRenderer:DrinksAvatarCell
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
        cellRenderer:DrinksDescriptionCell,
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
        cellRenderer:DrinksActionCell,
        width:300 
    },
];
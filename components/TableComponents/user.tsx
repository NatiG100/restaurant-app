import { CellClassParams, ColDef, ICellRendererParams } from "ag-grid-community";
import Image from "next/image";
import Button from "../UIElements/Button";

export interface TypeUser{
    id:string,
    fullName:string,
    previlages: string[],
    status: "Suspended"|"Active",
    img:string,
    email:string,
}

const UserActionCell = (params:ICellRendererParams<TypeUser>)=>{
    return(
        <div className="flex gap-4 font-semibold w-max">
                    <Button type="outline" className="w-24">View</Button>
            {
                params.data?.status==="Active"?
                    <Button type="outline" color="error" className="w-24">Suspend</Button>:
                    <Button type="outline" color="success" className="w-24">Activate</Button>
            }
        </div>
    );
}

const UserAvatarCell = (params:ICellRendererParams<TypeUser>)=>{
    return(
        <div className="flex justify-center items-center py-2 my-auto">
            <Image
                height={200}
                width={200}
                src={params.data?.img||""}
                alt={params.data?.fullName||""}
                className="rounded-full object-cover h-20 w-20 ring ring-indigo-700/20"
            />
        </div>
    );
}

const UserPrivilageCell = (params:ICellRendererParams<TypeUser>)=>{
    return(
        <div className="flex flex-wrap gap-2 py-2 overflow-y-auto max-h-28">
            {params.data?.previlages.map((previlage)=>(
                <div key={previlage} className="
                    border-2 border-indigo-500 bg-indigo-300/20 text-indigo-500
                    rounded-full px-3 flex justify-center items-center font-semibold
                ">
                    {previlage}
                </div>
            ))}
        </div>
    );
}

const statusColumnClass = (params:CellClassParams<TypeUser>)=>(
    params.data?.status==="Active"?"text-green-600 text-base":
    params.data?.status==="Suspended"?"text-red-600  text-base":
    "text-gray-600  text-base" 
);

const headerClass:string = "text-gray-700 text-base";
const cellClass:string = "text-gray-600 text-base";

export const defaultColDef:ColDef={
    resizable:true,
    autoHeight:true,
    headerClass
}
export const columnDefs:ColDef<TypeUser>[] = [
    {
        field:'img',
        headerName:"Avatar",
        width:122,
        resizable:false,
        cellRenderer:UserAvatarCell
    },
    { 
        field: 'id',
        headerName:"ID",
        cellClass:cellClass,
        filter: 'agTextColumnFilter',
    },
    { 
        field: 'fullName',
        headerName:"Full Name",
        cellClass:cellClass,
        width:150,
        sortable:true,  
    },
    { 
        field: 'previlages',
        headerName:"Previlages",
        cellRenderer:UserPrivilageCell,
        width:320,
        wrapText:true,
    },
    { 
        field: 'email',
        headerName:"Email",
        cellClass:cellClass,
        width:150,
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
        cellRenderer:UserActionCell,
        width:300 
    },
];
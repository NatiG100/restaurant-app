import { CellClassParams, ColDef, ICellRendererParams } from "ag-grid-community";
import Image from "next/image";
import { TypePermission } from "../../assets/permissions";
import baseURL from "../../constants/BASE_URL";
import Auth from "../hoc/Auth";
import Button from "../UIElements/Button";
import { CellRenderer } from "./foodCategories";
import {useRef} from 'react'
import useScroll from "../../hooks/useScroll";
import {CiCircleChevLeft as Left} from 'react-icons/ci'
import {CiCircleChevRight as Right} from 'react-icons/ci'

export interface TypeUser{
    id:string,
    fullName:string,
    previlages: TypePermission[],
    status: "Suspended"|"Active",
    img:string,
    email:string,
}

const UserActionCell = (params:ICellRendererParams<TypeUser>)=>{
    return(
        <div className="flex gap-4 font-semibold w-max items-center py-2">
            <Button 
                type="outline" 
                className="w-24"
                onClick={()=>{
                    params.context?.setSelecteduser(params.data);
                }}
            >View</Button>
            <Auth requiredPrevilage="Manage Users">
                {
                    params.data?.status==="Active"?
                    <Button 
                            type="outline" 
                            color="error" 
                            className="w-24"
                            onClick={()=>params.context?.requestStatusUpdate({status:"Suspended",id:params.data?.id})}
                            disabled={params.context?.isStatusUpdateLoading}
                        >Suspend</Button>:
                        <Button 
                            type="outline" 
                            color="success" 
                            className="w-24"
                            onClick={()=>params.context?.requestStatusUpdate({status:"Active",id:params.data?.id})}
                            disabled={params.context?.isStatusUpdateLoading}
                        >Activate</Button>
                }
            </Auth>
        </div>
    );
}

const UserAvatarCell = (params:ICellRendererParams<TypeUser>)=>{
    return(
        <div className="flex justify-center items-center py-2 my-auto">
            <img
                height={200}
                width={200}
                src={baseURL+(params.data?.img||"")}
                alt={params.data?.fullName||""}
                className="rounded-full object-cover h-14 w-14"
            />
        </div>
    );
}

const UserPrivilageCell = (params:ICellRendererParams<TypeUser>)=>{
    const scrollableRef = useRef(null);
    const {start,end,moveLeft,moveRight} = useScroll({ref:scrollableRef,amount:120});
    return(
        <div className="relative h-14 flex items-center">
            {(!start)&&<button 
                className="absolute left-0 top-1 h-full z-30 " 
                onClick={moveRight}><Left className="fill-gray-400 text-3xl hover:fill-white transition-colors duration-300 bg-gray-700/50 hover:bg-gray-700 rounded-full"/>
            </button>}
            {(!end)&&<button className="absolute right-0 top-1 h-full z-30" onClick={moveLeft}><Right className="fill-gray-400 text-3xl hover:fill-white transition-colors duration-300 bg-gray-700/50 hover:bg-gray-700 rounded-full"/></button>}
            <div className=" absolute left-0 top-1 w-full overflow-x-auto flex gap-2 h-full scrollbar-hide z-20 py-2" ref={scrollableRef}>
                {params.data?.previlages.map((previlage)=>(
                    <div key={previlage} className="
                        border-2 border-indigo-500 bg-indigo-300/20 text-indigo-500
                        rounded-full px-3 flex justify-center items-center font-semibold shrink-0
                    ">
                        {previlage}
                    </div>
                ))}
            </div>
        </div>
    );
}

const statusColumnClass = (params:CellClassParams<TypeUser>)=>(
    params.data?.status==="Active"?"h-14 flex items-center my-2 py-2 text-green-600 text-base":
    params.data?.status==="Suspended"?"h-14 flex items-center my-2 py-2 text-red-600  text-base":
    "h-14 flex items-center my-2 py-2 text-gray-600  text-base" 
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
        cellRenderer:UserAvatarCell
    },
    { 
        field: 'id',
        headerName:"ID",
        cellClass:cellClass,
        filter: 'agTextColumnFilter',
        cellRenderer:CellRenderer()
    },
    { 
        field: 'fullName',
        headerName:"Full Name",
        cellClass:cellClass,
        width:150,
        sortable:true,  
        cellRenderer:CellRenderer(true)
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
        cellRenderer:CellRenderer()
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
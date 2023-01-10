import { CellClassParams, ColDef, ICellRendererParams } from "ag-grid-community";
import QRCode from "react-qr-code";
import Button from "../UIElements/Button";
import domain from '../../constants/domain';
import IconButton from "../UIElements/IconButton";
import {MdOutlineDeleteOutline as DeleteIcon} from 'react-icons/md';

export interface TypeTable{
    id:string,
    tableNumber:string,
    status:"Suspended"|"Active"
}

const TableActionCell = (params:ICellRendererParams<TypeTable>)=>{
    return(
        <div className="flex gap-4 font-semibold w-max">
            {
                params.data?.status==="Active"?
                <Button type="outline" color="warning" className="w-24">Suspend</Button>:
                <Button type="outline" color="success" className="w-24">Activate</Button>
            }
            <IconButton 
                type="outline" 
                className="w-24 h-11"
                color='error'
                iconEnd={<DeleteIcon className="text-xl"/>}
            >Delete</IconButton>
        </div>
    );
}

const TableQRCell = (params:ICellRendererParams<TypeTable>)=>{
    return(
        <div className="bg-white h-20 w-20 my-2">
            <QRCode 
                value={domain+params.data?.id||""}
                className="w-full h-auto"
            />
        </div>
    );
}

const statusColumnClass = (params:CellClassParams<TypeTable>)=>(
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
export const columnDefs:ColDef<TypeTable>[] = [
    {
        headerName: "QR",
        cellRenderer:TableQRCell,
        width:200,
    },
    { 
        field: 'id',
        headerName:"ID",
        cellClass:cellClass,
        filter: 'agTextColumnFilter',
    },
    {
        field: 'tableNumber',
        headerName: 'Table Number',
        width:120,
        cellClass: cellClass,
        filter: 'agTextColumnFilter',
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
        cellRenderer:TableActionCell,
        width:300 
    },
];
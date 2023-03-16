import React,{useEffect, useState} from "react";
import {BiPrinter} from 'react-icons/bi'
import QRCode from "react-qr-code";
import { toast } from "react-toastify";
import { TypeTable } from "../TableComponents/tables";
import IconButton from "../UIElements/IconButton";
import Loading from "../UIElements/Loading";
export interface TableQRPrintProps{
    tables:TypeTable[],
    handlePrint:()=>any
}
export const TableQRPrint = React.forwardRef((props:TableQRPrintProps,ref:React.LegacyRef<HTMLDivElement>)=>{
    const[frontendWebDomai,setFrontendWebDomain] = useState<string|null>(null);
    useEffect(()=>{
        if(!localStorage.getItem("frontendWebDomain")){
            toast("Web domain is missing, please refresh the page",{type:"error",autoClose:false})
        }else{
            setFrontendWebDomain(localStorage.getItem("frontendWebDomain"));
        }
    },[]);
    if(!props.tables) return (<Loading type="full"/>)
    return(
        <div className="w-[2600px] h-full overflow-auto flex justify-center pt-2 bg-gray-50 relative">
            <div ref={ref} className="grid grid-cols-qr grid-rows-qr gap-x-[160px] gap-y-[127px] bg-white">
                {frontendWebDomai&&
                    props.tables.map((table)=><SingleQR {...table} key={table.id}/>)
                }
            </div>
            <div className="absolute bottom-4 right-4">
                <IconButton iconStart={<BiPrinter/>} onClick={props.handlePrint}>Print</IconButton>
            </div>
        </div>
    );
});
function SingleQR(table:TypeTable,domain:string){
    return(
        <div className="h-[1000px] w-[1000px] border-2 border-black flex items-center justify-center">
            <p className="text-2xl font-bold text-gray-800">{table.tableNumber}</p>
            <QRCode 
                value={domain+"/client/foods?tableNumber="+table.id||""}
                className="h-[500px] w-[500px]"
            />
        </div>
    )
}
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
        <div 
            onClick={(event)=>{event.stopPropagation()}} 
            className="
                bg-gray-50 w-[1000px] h-full overflow-auto flex justify-center 
                pt-6 pb-6  relative mb-4 mt-4
            "
        >
            <div 
                ref={ref} 
                className="
                    grid grid-cols-qr grid-rows-qr
                    bg-white h-max w-full justify-center items-center p-4
                "
            >
                {frontendWebDomai&&
                    props.tables.map((table)=><SingleQR {...table} key={table.id}/>)
                }
            </div>
            <div className="fixed bottom-4 right-4">
                <IconButton 
                    iconStart={<BiPrinter/>} 
                    onClick={props.handlePrint} 
                    className="w-32 shadow-xl shadow-black/50"
                    color="success"
                    size="lg"
                >
                    Print
                </IconButton>
            </div>
        </div>
    );
});
function SingleQR(table:TypeTable,domain:string){
    return(
        <div className="
            h-[314px] w-[350px] border-2 border-black flex flex-col 
            items-center justify-center gap-4 p-4 m-4
        ">
            <p className="text-3xl font-bold">{table.tableNumber}</p>
            <QRCode 
                value={domain+"/client/foods?tableNumber="+table.id||""}
                className="h-[200px] w-[200px] m-4 p-6 border-2 border-dashed rounded-lg border-gray-400"
            />
        </div>
    )
}
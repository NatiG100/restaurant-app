import {useRef, useEffect,useState, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {AiOutlinePrinter,AiOutlineExport} from 'react-icons/ai';
import IconButton from "../components/UIElements/IconButton";
import { columnDefs, defaultColDef, TypeTable } from "../components/TableComponents/tables";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { TypeCustomeErrorResponse, TypeMultiDataResponse } from "../types/types";
import { fetchAllTables } from "../services/TableService";
import { toast } from "react-toastify";
import Divider from "../components/UIElements/Divider";
import {GoPlus as PlusIcon} from 'react-icons/go';
import Backdrop from "../components/Backdrop";
import CreateTableModal from "../components/modals/TableModal/CreateTableModal";
import { useReactToPrint } from "react-to-print";
import { TableQRPrint } from "../components/TableQRPrint";


export default function DrinkCategories({setAppBarComponent}:any){
    const tableRef = useRef<HTMLDivElement>(null);
    // get ag-grid api ref
    const gridRef = useRef<AgGridReact>(null);

    //Add custom header components
    const [openCreateModal,setOpenCreateModal] = useState<boolean>(false);
    const handleCloseCreateModal = ()=>{
        setOpenCreateModal(false);
        refetch();
    }
    const handleOpenCreateModal = ()=>{
        setOpenCreateModal(true);
    }
    // const handlePrint = useCallback(()=>{
    //     if(tableRef.current){
    //         const api = gridRef.current!.api!;
    //         api.setDomLayout("print");
    //         setTimeout(function(){
    //             print();
    //             api.setDomLayout();
    //         }, 2000)
    //     }
    // },[tableRef])
    useEffect(()=>{
        setAppBarComponent(
          <div className="h-full flex gap-4 items-center">
            <IconButton 
                className="w-28 py-2" 
                size="lg" 
                iconStart={<AiOutlinePrinter className="text-xl"/>}
                onClick={handlePrint}
                >Print</IconButton>
            <div className="h-7">
                <Divider orientation="v"/>
            </div>
            <IconButton 
                className="w-46 py-2" 
                size="lg" 
                type="outline"
                color="success"
                iconEnd={<PlusIcon className="text-xl"/>}
                onClick={handleOpenCreateModal}
                >Add New Table</IconButton>
          </div>
          
          );
          return ()=>{
              setAppBarComponent(<div></div>);
            }
        },[]);
        
    // get rows
    const {
        data:response,
        error,
        isLoading,
        refetch
    } = useQuery<
        TypeMultiDataResponse,
        TypeCustomeErrorResponse
    >('fethAllTables',fetchAllTables);
    
    useEffect(()=>{
        if(error){
            toast(error?.message,{type:"error"});
        }
        if(response){
            gridRef.current?.api?.hideOverlay();
        }
    },[error,response]);

    const tableQrsRef = useRef(null);
    const handlePrint = useReactToPrint({
        content:()=>tableQrsRef.current
    })

    return (
            <div className="ag-theme-alpine h-full w-full" ref={tableRef}>
                {
                    openCreateModal&&
                    <Backdrop onClick={handleCloseCreateModal}>
                        <CreateTableModal
                            onClose={handleCloseCreateModal}
                        />
                    </Backdrop>
                }
                <Backdrop>
                    <TableQRPrint tables={response?.data as TypeTable[]} handlePrint={handlePrint} ref={tableQrsRef}/>
                </Backdrop>
                <AgGridReact
                    context={{
                        refetch
                    }}
                    ref={gridRef}
                    rowData={response?.data}
                    columnDefs={columnDefs}
                    rowStyle={{width:"100%"}}
                    overlayLoadingTemplate={
                        '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>'
                    }
                    rowDragManaged={true}
                    containerStyle={{
                        border:"0px solid #fff0"
                    }}
                    defaultColDef={defaultColDef}
                >
                </AgGridReact>
            </div>
    );
}
import {useRef, useEffect,useState, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {AiOutlinePrinter,AiOutlineExport} from 'react-icons/ai';
import IconButton from "../components/UIElements/IconButton";
import { columnDefs, defaultColDef, TypeTable } from "../components/TableComponents/tables";
import { useRouter } from "next/router";


export default function DrinkCategories({setAppBarComponent}:any){
    const tableRef = useRef<HTMLDivElement>(null);
    // get ag-grid api ref
    const gridRef = useRef<AgGridReact>(null);
    const handleExportClicked = ()=>{
        gridRef.current!.api.exportDataAsCsv();
    }
    const handlePrint = useCallback(()=>{
        if(tableRef.current){
            const api = gridRef.current!.api!;
            api.setDomLayout("print");
            setTimeout(function(){
                print();
                api.setDomLayout();
            }, 2000)
        }
    },[tableRef])

    //Add custom header components
    useEffect(()=>{
        setAppBarComponent(
          <div className="h-full flex gap-4 items-center">
            <IconButton 
                className="w-28 py-2" 
                size="lg" 
                iconStart={<AiOutlinePrinter className="text-xl"/>}
                onClick={handlePrint}
            >Print</IconButton>
            <IconButton 
                className="w-28 py-2" 
                size="lg" 
                type="outline"
                color="success"
                iconStart={<AiOutlineExport className="text-xl"/>}
                onClick={handleExportClicked}
            >Export</IconButton>
          </div>
          
        );
        return ()=>{
          setAppBarComponent(<div></div>);
        }
      },[]);

    // get rows
    const [rowData] = useState<TypeTable[]>([
        {
            id:"1200padkjfthisthat",
            status:"Active",
            tableNumber:"A1"
        },
        {
            id:"ab00padkjfdhisthak",
            status:"Suspended",
            tableNumber:"A2"
        },
        {
            id:"1200padkjaklsjsthat",
            status:"Active",
            tableNumber:"B1"
        },
        {
            id:"fjaksdjfkjanduieopl",
            status:"Suspended",
            tableNumber:"B2"
        },
        {
            id:"nncmmkajdhfaldfkdjk",
            status:"Active",
            tableNumber:"C1"
        },
    ]);
    const router = useRouter();
    return (
            <div className="ag-theme-alpine h-full w-full" ref={tableRef}>
                <AgGridReact
                    ref={gridRef}
                    rowData={rowData}
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
import {useRef, useEffect,useState, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {AiOutlinePrinter,AiOutlineExport} from 'react-icons/ai';
import IconButton from "../components/UIElements/IconButton";
import { columnDefs, defaultColDef, TypeUser } from "../components/TableComponents/user";
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
    const [rowData] = useState<TypeUser[]>([
        {
            id:"1200padkjfthisthat",
            img:"/dinner.jpg",
            fullName:"Abebe Kebede",
            status:"Active",
            email:"abebe@gmail.com",
            previlages:[]
        },
        {
            id:"ab00padkjfdhisthak",
            img:"/dinner.jpg",
            fullName:"Temesgen Beyene",
            status:"Active",
            email:"temesgen@gmail.com",
            previlages:[]
        },
        {
            id:"1200padkjaklsjsthat",
            img:"/dinner.jpg",
            fullName:"Mulgeta Demberu",
            status:"Active",
            email:"mulgeta@gmail.com",
            previlages:[]
        },
        {
            id:"fjaksdjfkjanduieopl",
            img:"/dinner.jpg",
            fullName:"Ayele Habte",
            status:"Suspended",
            email:"ayele@gmail.com",
            previlages:[]
        },
        {
            id:"nncmmkajdhfaldfkdjk",
            img:"/dinner.jpg",
            fullName:"Belete Belayneh",
            status:"Active",
            email:"belete@gmail.com",
            previlages:[]
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
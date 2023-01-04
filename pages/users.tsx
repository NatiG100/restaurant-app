import {useRef, useEffect,useState, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {AiOutlinePrinter,AiOutlineExport} from 'react-icons/ai';
import IconButton from "../components/UIElements/IconButton";
import { columnDefs, defaultColDef, TypeUser } from "../components/TableComponents/user";
import { useRouter } from "next/router";
import Backdrop from "../components/Backdrop";
import ViewUserModal from "../components/modals/userModals/ViewUserModal";


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
            img:"/avatar.jpg",
            fullName:"Abebe Kebede",
            status:"Active",
            email:"abebe@gmail.com",
            previlages:["View Info","Manage Items","View Items","View Users","Manage Users","Setting","Manage Orders","View Orders"]
        },
        {
            id:"ab00padkjfdhisthak",
            img:"/avatar.jpg",
            fullName:"Temesgen Beyene",
            status:"Active",
            email:"temesgen@gmail.com",
            previlages:["View Items","View Users","Manage Users"]
        },
        {
            id:"1200padkjaklsjsthat",
            img:"/avatar.jpg",
            fullName:"Mulgeta Demberu",
            status:"Active",
            email:"mulgeta@gmail.com",
            previlages:["Manage Orders","View Orders"]
        },
        {
            id:"fjaksdjfkjanduieopl",
            img:"/avatar.jpg",
            fullName:"Ayele Habte",
            status:"Suspended",
            email:"ayele@gmail.com",
            previlages:["Manage Orders","View Orders"]
        },
        {
            id:"nncmmkajdhfaldfkdjk",
            img:"/avatar.jpg",
            fullName:"Belete Belayneh",
            status:"Active",
            email:"belete@gmail.com",
            previlages:["View Info","Manage Items"]
        },
    ]);
    const router = useRouter();
    const [selectedUser,setSelecteduser] = useState<TypeUser | null>(null);
    const handleModalClose = ()=>{
        setSelecteduser(null);
    }
    return (
            <div className="ag-theme-alpine h-full w-full" ref={tableRef}>
                {
                    selectedUser&&
                    <Backdrop onClick={handleModalClose}>
                        <ViewUserModal user={selectedUser} onClose={handleModalClose}/>
                    </Backdrop>
                }
                <AgGridReact
                    context={{
                        setSelecteduser
                    }}
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
import {useRef, useEffect,useState, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import IconButton from "../components/UIElements/IconButton";
import { columnDefs, defaultColDef, TypeUser } from "../components/TableComponents/user";
import Backdrop from "../components/Backdrop";
import ViewUserModal from "../components/modals/userModals/ViewUserModal";
import Divider from "../components/UIElements/Divider";
import {GoPlus as PlusIcon} from 'react-icons/go';
import AddUserModal from "../components/modals/userModals/AddUserModal";
import { useQuery } from "react-query";
import { fetchAllUsers } from "../services/UsersService";
import { toast } from "react-toastify";
import Loading from "../components/UIElements/Loading";


export default function DrinkCategories({setAppBarComponent}:any){
    const tableRef = useRef<HTMLDivElement>(null);
    // get ag-grid api ref
    const gridRef = useRef<AgGridReact>(null);

    //modal open state logic
    const[openAddModal, setOpenAddModal] = useState<boolean>(false);
    const handleAddModalOpen = ()=>{
        setOpenAddModal(true);
    }
    const handleAddModalClose = ()=>{
        setOpenAddModal(false);
        refetch();
    }
    //Add custom header components
    useEffect(()=>{
        setAppBarComponent(
          <div className="h-full flex gap-4 items-center">
            <p className="text-2xl text-indigo-600 font-semibold">Users</p>
            <div className="h-7">
                <Divider orientation="v"/>
            </div>
            <IconButton 
                className="w-46 py-2" 
                size="lg" 
                type="outline"
                color="success"
                iconEnd={<PlusIcon className="text-xl"/>}
                onClick={handleAddModalOpen}
            >Add New User</IconButton>
          </div>
          
        );
        return ()=>{
          setAppBarComponent(<div></div>);
        }
      },[]);

    // get rows

    const {data:response,error,isLoading,refetch} = useQuery('fethAllUsers',fetchAllUsers);
    useEffect(()=>{
        if(error){
            toast(error?.message);
        }
    },[error])
    
    const [selectedUser,setSelecteduser] = useState<TypeUser | null>(null);
    const handleModalClose = ()=>{
        setSelecteduser(null);
    }
    if(isLoading) return <Loading type="contained"/>
    return (
        <div className="ag-theme-alpine h-full w-full" ref={tableRef}>
            {
                selectedUser&&
                <Backdrop onClick={handleModalClose}>
                    <ViewUserModal 
                        user={selectedUser} 
                        onClose={handleModalClose}
                    />
                </Backdrop>
            }
            {
                openAddModal&&
                <Backdrop onClick={handleAddModalClose}>
                    <AddUserModal onClose={handleAddModalClose}/>
                </Backdrop>
            }
            <AgGridReact
                context={{
                    setSelecteduser
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
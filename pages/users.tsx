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
import { useMutation, useQuery } from "react-query";
import { changeUserStatus, fetchAllUsers } from "../services/UsersService";
import { toast } from "react-toastify";
import { TypeCustomeErrorResponse, TypeMultiDataResponse } from "../types/types";


export default function DrinkCategories({setAppBarComponent}:any){
    const tableRef = useRef<HTMLDivElement>(null);
    // get ag-grid api ref
    const gridRef = useRef<AgGridReact>(null);
    useEffect(()=>{
        gridRef.current?.api?.showLoadingOverlay();
    },[])

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
    const {
        data:response,
        error,
        isLoading,
        refetch
    } = useQuery<
        TypeMultiDataResponse,
        TypeCustomeErrorResponse
    >('fethAllUsers',fetchAllUsers);
    
    useEffect(()=>{
        if(error){
            toast(error?.message,{type:"error"});
        }
        if(response){
            gridRef.current?.api?.hideOverlay();
        }
    },[error,response])
    

    //api request for changing user status
    const {
        mutate:requestStatusUpdate,
        error:statusUpdateError,
        isLoading:isStatusUpdateLoading,
        data:statusUpdateData
    } = useMutation<
        TypeMultiDataResponse,
        TypeCustomeErrorResponse,
        {status:"Active"|"Suspended",id:string}
    >(changeUserStatus);

    useEffect(()=>{
        if(statusUpdateData){
            toast(statusUpdateData?.message,{type:"success"})
            //update the selected user after refetching
            refetch().then((data)=>{
                const users = data.data?.data as any; 
                if(selectedUser){
                    setSelecteduser((prevSelectedUser)=>{
                        const currentUser = users.filter((user:TypeUser)=>(user.id===selectedUser?.id))[0];
                        return currentUser;
                    });
                }
            });
        }
        if(statusUpdateError){
            toast(statusUpdateError?.message,{type:"error"});
        }
    },[statusUpdateData,statusUpdateError])

    //modal view logic
    const [selectedUser,setSelecteduser] = useState<TypeUser | null>(null);
    const handleModalClose = ()=>{
        setSelecteduser(null);
        refetch();
    }
    return (
        <div className="ag-theme-alpine h-full w-full" ref={tableRef}>
            {
                selectedUser&&
                <Backdrop onClick={handleModalClose}>
                    <ViewUserModal 
                        user={selectedUser} 
                        onClose={handleModalClose}
                        isStatusChangeLoading={isStatusUpdateLoading}
                        changeUserStatus={requestStatusUpdate}
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
                    setSelecteduser,
                    isStatusUpdateLoading,
                    requestStatusUpdate,
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
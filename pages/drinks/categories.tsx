import {useRef, useEffect,useState, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import IconButton from "../../components/UIElements/IconButton";
import { columnDefs, defaultColDef, TypeDrinkCategory } from "../../components/TableComponents/drinkCategories";
import { RowClickedEvent } from "ag-grid-community";
import { useRouter } from "next/router";
import Backdrop from "../../components/Backdrop";
import DrinkCategoriesModal from "../../components/modals/drinkCategoryModals/DrinkCategoryModal";
import Divider from "../../components/UIElements/Divider";
import {GoPlus as PlusIcon} from 'react-icons/go';
import CreateDrinkCategoryModal from "../../components/modals/drinkCategoryModals/CreateDrinkCategoryModal";
import { useMutation, useQuery } from "react-query";
import { TypeCustomeErrorResponse, TypeMultiDataResponse } from "../../types/types";
import { changeDrinkCategoryStatus, fetchAllDrinkCategories, TypeChangeDrinkCategoryStatus } from "../../services/DrinkCategoryService";
import { toast } from "react-toastify";
import Auth from "../../components/hoc/Auth";
import TableWrapper from "../../components/TableWrapper";


export default function DrinkCategories({setAppBarComponent}:any){
    const tableRef = useRef<HTMLDivElement>(null);
    // get ag-grid api ref
    const gridRef = useRef<AgGridReact>(null);

    //state logic for create new category modal
    const [openModal,setOpenModal] = useState<boolean>(false);
    const handleCreateModalClose = () =>{
        setOpenModal(false);
        refetch();
    }
    const handleCreateModalOpen = () =>{
        setOpenModal(true);
    }

    //Add custom header components
    useEffect(()=>{
        setAppBarComponent(
          <div className="h-full flex gap-4 items-center">
            <p className="text-2xl text-indigo-600 font-semibold">Categories</p>
            <Auth requiredPrevilage="Manage Items">
                <div className="h-7">
                    <Divider orientation="v"/>
                </div>
                <IconButton 
                    className="w-46 py-2" 
                    size="lg" 
                    type="outline"
                    color="success"
                    iconEnd={<PlusIcon className="text-xl"/>}
                    onClick={handleCreateModalOpen}
                >Create New Category</IconButton>
            </Auth>
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
    >('fethAllDrinks',fetchAllDrinkCategories);
    
    useEffect(()=>{
        if(error){
            toast(error?.message,{type:"error"});
        }
        if(response){
            gridRef.current?.api?.hideOverlay();
        }
    },[error,response])
    const router = useRouter();
    const handleClick = (event:RowClickedEvent<TypeDrinkCategory>)=>{
        const id = event.data?.id;
        router.push('/drinks/'+id+'?name='+event.data?.name);
    }

    //api request for changing food category status
    const{
        mutate:requestStatusUpdate,
        error:statusUpdateError,
        isLoading:isStatusUpdateLoading,
        data:statusUpdateData
    } = useMutation<
        TypeMultiDataResponse,
        TypeCustomeErrorResponse,
        TypeChangeDrinkCategoryStatus
    >(changeDrinkCategoryStatus);

    useEffect(()=>{
        if(statusUpdateData){
            toast(statusUpdateData?.message,{type:"success"});
            //update the selected user after refetching
            refetch().then((data)=>{
                const drinkCategory = data.data?.data;
                if(selectedDrinkCategory){
                    setSelectedDrinkCategory((prev)=>{
                        const currentCategory = drinkCategory?.filter(
                            (category:TypeDrinkCategory)=>(category.id===selectedDrinkCategory.id)
                        )[0];
                        return currentCategory;
                    })
                }
            })
        }
    },[statusUpdateData,statusUpdateError])

    const [selectedDrinkCategory,setSelectedDrinkCategory] = useState<TypeDrinkCategory|null>(null);
    const handleModalClose = ()=>{
        setSelectedDrinkCategory(null);
        refetch();
    }
    return (
        <TableWrapper>
            <div className="ag-theme-alpine h-full w-full shadow-md shadow-gray-[#fffb]" ref={tableRef}>
                {
                    selectedDrinkCategory&&
                    <Backdrop onClick={handleModalClose}>
                        <DrinkCategoriesModal
                            onClose={handleModalClose}
                            category={selectedDrinkCategory}
                            changeStatus={requestStatusUpdate}
                            isStatusChangeLoading={isStatusUpdateLoading}
                        />
                    </Backdrop>
                }
                <Auth requiredPrevilage="Manage Items">
                    {
                        openModal&&
                        <Backdrop onClick={handleCreateModalClose}>
                            <CreateDrinkCategoryModal
                                onClose={handleCreateModalClose}
                            />
                        </Backdrop>
                    }
                </Auth>
                <AgGridReact
                    context={{
                        setSelectedDrinkCategory,
                        isStatusUpdateLoading,
                        requestStatusUpdate,
                    }}
                    onRowDoubleClicked={handleClick}
                    ref={gridRef}
                    rowData={response?.data}
                    columnDefs={columnDefs}
                    rowStyle={{width:"100%"}}
                    overlayLoadingTemplate={
                        '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>'
                    }
                    noRowsOverlayComponent={
                        '<span class="ag-overlay-loading-center">No Data to display</span>'
                    }
                    rowDragManaged={true}
                    containerStyle={{
                        border:"0px solid #fff0"
                    }}
                    defaultColDef={defaultColDef}
                >
                </AgGridReact>
            </div>
        </TableWrapper>
    );
}
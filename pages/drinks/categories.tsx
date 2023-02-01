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
import { useQuery } from "react-query";
import { TypeCustomeErrorResponse, TypeMultiDataResponse } from "../../types/types";
import { fetchAllDrinkCategories } from "../../services/DrinkCategoryService";
import { toast } from "react-toastify";


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
        router.push('/drinks/'+id);
    }
    const [selectedDrinkCategory,setSelectedDrinkCategory] = useState<TypeDrinkCategory|null>(null);
    const handleModalClose = ()=>{
        setSelectedDrinkCategory(null);
        refetch();
    }
    return (
            <div className="ag-theme-alpine h-full w-full" ref={tableRef}>
                {
                    selectedDrinkCategory&&
                    <Backdrop onClick={handleModalClose}>
                        <DrinkCategoriesModal
                            onClose={handleModalClose}
                            category={selectedDrinkCategory}
                        />
                    </Backdrop>
                }
                {
                    openModal&&
                    <Backdrop onClick={handleCreateModalClose}>
                        <CreateDrinkCategoryModal
                            onClose={handleCreateModalClose}
                        />
                    </Backdrop>
                }
                <AgGridReact
                    context={{
                        setSelectedDrinkCategory
                    }}
                    onRowDoubleClicked={handleClick}
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
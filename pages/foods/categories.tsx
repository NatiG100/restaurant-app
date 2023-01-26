import {useRef, useEffect,useState, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {GoPlus as PlusIcon} from 'react-icons/go';
import IconButton from "../../components/UIElements/IconButton";
import { columnDefs, defaultColDef, TypeFoodCategory } from "../../components/TableComponents/foodCategories";
import { RowClickedEvent } from "ag-grid-community";
import { useRouter } from "next/router";
import Backdrop from "../../components/Backdrop";
import FoodCategoriesModal from "../../components/modals/FoodCategoriesModal";
import CreateFoodCategoryModal from "../../components/modals/CreateFoodCategoryModal";
import Divider from "../../components/UIElements/Divider";
import { useMutation, useQuery } from "react-query";
import { TypeCustomeErrorResponse, TypeMultiDataResponse } from "../../types/types";
import { changeFoodCategoryStatus, fetchAllFoodCategories, TypeChangeFoodCategoryStatus } from "../../services/FoodCategoryService";
import {toast} from 'react-toastify';


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
    const {data:response,error,isLoading,refetch} = useQuery<TypeMultiDataResponse,TypeCustomeErrorResponse>('fethAllUsers',fetchAllFoodCategories);
    useEffect(()=>{
        if(error){
            toast(error?.message,{type:"error"});
        }
        if(response){
            gridRef.current?.api?.hideOverlay();
        }
    },[error,response])
    
    //routing logic
    const router = useRouter();
    const handleClick = (event:RowClickedEvent<TypeFoodCategory>)=>{
        const id = event.data?.id;
        router.push('/foods/'+id);
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
        TypeChangeFoodCategoryStatus
    >(changeFoodCategoryStatus);

    useEffect(()=>{
        if(statusUpdateData){
            toast(statusUpdateData?.message,{type:"success"});
            //update the selected user after refetching
            refetch().then((data)=>{
                const foodCategory = data.data?.data;
                if(selectedFoodCategory){
                    setSelectedFoodCategory((prev)=>{
                        const currentCategory = foodCategory?.filter(
                            (category:TypeFoodCategory)=>(category.id===selectedFoodCategory.id)
                        )[0];
                        return currentCategory;
                    })
                }
            })
        }
    },[statusUpdateData,statusUpdateError])

    //modal close logic
    const [selectedFoodCategory,setSelectedFoodCategory] = useState<TypeFoodCategory|null>(null);
    const handleModalClose = ()=>{
        setSelectedFoodCategory(null);
        refetch();
    }
    return (
            <div className="ag-theme-alpine h-full w-full" ref={tableRef}>
                {
                    selectedFoodCategory&&
                    <Backdrop onClick={handleModalClose}>
                        <FoodCategoriesModal
                            onClose={handleModalClose}
                            category={selectedFoodCategory}
                            changeStatus={requestStatusUpdate}
                            isStatusChangeLoading={isStatusUpdateLoading}
                        />
                    </Backdrop>
                }
                {
                    openModal&&
                    <Backdrop onClick={handleCreateModalClose}>
                        <CreateFoodCategoryModal
                            onClose={handleCreateModalClose}
                        />
                    </Backdrop>
                }
                <AgGridReact
                    context={{
                        setSelectedFoodCategory,
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
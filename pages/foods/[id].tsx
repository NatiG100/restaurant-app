import {useRef, useEffect,useState, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import IconButton from "../../components/UIElements/IconButton";
import { columnDefs, defaultColDef, TypeFood } from "../../components/TableComponents/foods";
import { NextRouter, useRouter } from "next/router";
import Button from "../../components/UIElements/Button";
import Divider from "../../components/UIElements/Divider";
import Backdrop from "../../components/Backdrop";
import FoodTableViewModal from "../../components/modals/foodTableModals/FoodTableViewModal";
import {GoPlus as PlusIcon} from 'react-icons/go';
import CreateFoodModal from "../../components/modals/foodTableModals/CreateFoodModal";
import { useMutation, useQuery } from "react-query";
import { TypeCustomeErrorResponse, TypeMultiDataResponse } from "../../types/types";
import { changeFoodStatus, fetchAllFoods, TypeChangeFoodStatus } from "../../services/FoodService";
import { toast } from "react-toastify";
import Auth from "../../components/hoc/Auth";



export default function DrinkCategories({setAppBarComponent}:any){
    const tableRef = useRef<HTMLDivElement>(null);
    // get ag-grid api ref
    const gridRef = useRef<AgGridReact>(null);
    const router:NextRouter = useRouter();
    const {id} = router.query;
    //Add custom header components
    const [openCreateModal,setOpenCreateModal] = useState<boolean>(false);
    const handleCloseCreateModal = ()=>{
        setOpenCreateModal(false);
        refetch();
    }
    const handleOpenCreateModal = ()=>{
        setOpenCreateModal(true);
    }
    const handleCategoriesClicked = ()=>{
        router.back();
    }
    useEffect(()=>{
        setAppBarComponent(
          <div className="h-full flex gap-4 items-center">
            <div className="flex items-center ">
                <Button type="text" className="w-28" size="lg" onClick={handleCategoriesClicked}>Categories</Button>
                <p className="text-2xl text-indigo-600 font-semibold">/ {router.query.name}</p>
            </div>
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
                    onClick={handleOpenCreateModal}
                >Create New Food</IconButton>
            </Auth>
          </div>
          
        );
        return ()=>{
          setAppBarComponent(<div></div>);
        }
      },[]);

    // get rows
    const {
        refetch,
        data,
        error,
    }=useQuery<
        TypeMultiDataResponse,
        TypeCustomeErrorResponse
    >('fetchAllFoods',()=>fetchAllFoods({categoryId:id as string}));
    useEffect(()=>{
        if(data){
            gridRef.current?.api?.hideOverlay();
        }
        if(error){
            toast(error.message,{type:"error"});
        }
    },[data,error])
    
        //api request for changing food category status
        const{
            mutate:requestStatusUpdate,
            error:statusUpdateError,
            isLoading:isStatusUpdateLoading,
            data:statusUpdateData
        } = useMutation<
            TypeMultiDataResponse,
            TypeCustomeErrorResponse,
            TypeChangeFoodStatus
        >(changeFoodStatus);
    
        useEffect(()=>{
            if(statusUpdateData){
                toast(statusUpdateData?.message,{type:"success"});
                //update the selected user after refetching
                refetch().then((data)=>{
                    const foodCategory = data.data?.data;
                    if(selectedFood){
                        setSelectedFood((prev)=>{
                            const currentCategory = foodCategory?.filter(
                                (category:TypeFood)=>(category.id===selectedFood.id)
                            )[0];
                            return currentCategory;
                        })
                    }
                })
            }
        },[statusUpdateData,statusUpdateError])

    const [selectedFood, setSelectedFood] = useState<TypeFood | null>(null);
    const handleFoodViewModalClose = ()=>{
        setSelectedFood(null);
        refetch();
    }
    return (
            <div className="ag-theme-alpine h-full w-full" ref={tableRef}>
                {   selectedFood&&
                    <Backdrop onClick={handleFoodViewModalClose}>
                        <FoodTableViewModal 
                            food={selectedFood} 
                            onClose={handleFoodViewModalClose}
                            changeStatus={requestStatusUpdate}
                            isStatusChangeLoading={isStatusUpdateLoading}
                        />
                    </Backdrop>
                }
                <Auth requiredPrevilage="Manage Items">
                    {
                        openCreateModal&&
                        <Backdrop onClick={handleCloseCreateModal}>
                            <CreateFoodModal
                                onClose={handleCloseCreateModal}
                                categoryId={id as string}
                            />
                        </Backdrop>
                    }
                </Auth>
                <AgGridReact
                    ref={gridRef}
                    rowData={data?.data}
                    columnDefs={columnDefs}
                    context={{
                        setSelectedFood,
                        isStatusUpdateLoading,
                        requestStatusUpdate,
                    }}
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
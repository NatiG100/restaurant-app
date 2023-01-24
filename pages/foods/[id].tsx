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
import { useQuery } from "react-query";
import { TypeCustomeErrorResponse, TypeMultiDataResponse } from "../../types/types";
import { fetchAllFoods } from "../../services/FoodService";
import { toast } from "react-toastify";



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
                <p className="text-2xl text-indigo-600 font-semibold">/ Dinner</p>
            </div>
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
                        />
                    </Backdrop>
                }
                {
                    openCreateModal&&
                    <Backdrop onClick={handleCloseCreateModal}>
                        <CreateFoodModal
                            onClose={handleCloseCreateModal}
                        />
                    </Backdrop>
                }
                <AgGridReact
                    ref={gridRef}
                    rowData={data?.data}
                    columnDefs={columnDefs}
                    context={{
                        setSelectedFood
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
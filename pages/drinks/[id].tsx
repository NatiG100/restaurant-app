import {useRef, useEffect,useState, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {AiOutlinePrinter,AiOutlineExport} from 'react-icons/ai';
import IconButton from "../../components/UIElements/IconButton";
import { columnDefs, defaultColDef, TypeDrink } from "../../components/TableComponents/drinks";
import { NextRouter, useRouter } from "next/router";
import DrinkTableViewModal from "../../components/modals/drinkTableModals/DrinkTableViewModal";
import Backdrop from "../../components/Backdrop";
import Button from "../../components/UIElements/Button";
import Divider from "../../components/UIElements/Divider";
import {GoPlus as PlusIcon} from 'react-icons/go';
import CreateDrinkModal from "../../components/modals/drinkTableModals/CreateDrinkModal";
import { useMutation, useQuery } from "react-query";
import { TypeCustomeErrorResponse, TypeMultiDataResponse } from "../../types/types";
import { changeDrinkStatus, fetchAllDrinks, TypeChangeDrinkStatus } from "../../services/DrinkService";
import { toast } from "react-toastify";
import Auth from "../../components/hoc/Auth";
import TableWrapper from "../../components/TableWrapper";


export default function DrinkCategories({setAppBarComponent}:any){
    const tableRef = useRef<HTMLDivElement>(null);
    // get ag-grid api ref
    const gridRef = useRef<AgGridReact>(null);
    //fit width logic
    const fitSize = useCallback(()=>{
        if(gridRef.current){
            gridRef.current.api.sizeColumnsToFit({defaultMinWidth:280});
        }
    },[gridRef]);
    useEffect(()=>{
        addEventListener('resize',fitSize);
        return ()=>{removeEventListener('resize',fitSize)}
    },[])

    const router:NextRouter = useRouter();

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

    //Add custom header components
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
                >Create New Drink</IconButton>
            </Auth>
          </div>
          
        );
        return ()=>{
          setAppBarComponent(<div></div>);
        }
    },[]);
    
    // get rows
    const {id} = router.query;
    const {
        refetch,
        data,
        error,
    }=useQuery<
        TypeMultiDataResponse,
        TypeCustomeErrorResponse
    >('fetchAllDrinks',()=>fetchAllDrinks({categoryId:id as string}));
    useEffect(()=>{
        if(data){
            gridRef.current?.api?.hideOverlay();
        }
        if(error){
            toast(error.message,{type:"error"});
        }
    },[data,error]);


    //api request for changing food category status
    const{
        mutate:requestStatusUpdate,
        error:statusUpdateError,
        isLoading:isStatusUpdateLoading,
        data:statusUpdateData
    } = useMutation<
        TypeMultiDataResponse,
        TypeCustomeErrorResponse,
        TypeChangeDrinkStatus
    >(changeDrinkStatus);

    useEffect(()=>{
        if(statusUpdateData){
            toast(statusUpdateData?.message,{type:"success"});
            //update the selected user after refetching
            refetch().then((data)=>{
                const drink = data.data?.data;
                if(selectedDrink){
                    setSelectedDrink((prev)=>{
                        const currentDrink = drink?.filter(
                            (category:TypeDrink)=>(category.id===selectedDrink.id)
                        )[0];
                        return currentDrink;
                    })
                }
            })
        }
    },[statusUpdateData,statusUpdateError])

    const [selectedDrink, setSelectedDrink] = useState<TypeDrink | null>(null);
    const handleFoodViewModalClose = ()=>{
        setSelectedDrink(null);
        refetch();
    }
    return (
        <TableWrapper>
            <div className=" ag-theme-alpine  h-full shadow-[2px_2px_4px_#0004]  rounded-lg overflow-hidden border border-[#14234d4f]" ref={tableRef}>
                {
                    selectedDrink&&
                    <Backdrop onClick={handleFoodViewModalClose}>
                        <DrinkTableViewModal 
                            drink={selectedDrink} 
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
                            <CreateDrinkModal 
                                onClose={handleCloseCreateModal} 
                                categoryId={id as string}
                            />
                        </Backdrop>
                    }
                </Auth>
                <AgGridReact
                    context={{
                        setSelectedDrink,
                        isStatusUpdateLoading,
                        requestStatusUpdate,
                    }}
                    ref={gridRef}
                    rowData={data?.data}
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
                    onColumnResized={fitSize}
                    onDisplayedColumnsChanged={fitSize}
                >
                </AgGridReact>
            </div>
        </TableWrapper>
    );
}
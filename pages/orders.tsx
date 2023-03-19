import {useRef, useEffect,useState, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { columnDefs, TypeOrder } from "../components/TableComponents/order";
import {AiOutlinePrinter,AiOutlineExport} from 'react-icons/ai';
import IconButton from "../components/UIElements/IconButton";
import Backdrop from "../components/Backdrop";
import OrderModal from "../components/modals/OrderModal";
import { useMutation, useQuery } from "react-query";
import { TypeCustomeErrorResponse, TypeMultiDataResponse } from "../types/types";
import { changeOrderStatus, fetchAllOrders, TypeChangeOrderStatus } from "../services/OrderService";
import { toast } from "react-toastify";
import usePageRedirect from "../components/hoc/usePageRedirect";
import Loading from "../components/UIElements/Loading";


export default function Orders({setAppBarComponent}:any){
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
    const {
        data:response,
        error,
        isLoading,
        refetch
    } = useQuery<
        TypeMultiDataResponse,
        TypeCustomeErrorResponse
    >('fetchAllOrders',fetchAllOrders);
    
    useEffect(()=>{
        if(error){
            toast(error?.message,{type:"error"});
        }
        if(response){
            gridRef.current?.api?.hideOverlay();
        }
    },[error,response]);

    const{
        mutate:requestStatusUpdate,
        error:statusUpdateError,
        isLoading:isStatusUpdateLoading,
        data:statusUpdateData
    } = useMutation<
        TypeMultiDataResponse,
        TypeCustomeErrorResponse,
        TypeChangeOrderStatus
    >(changeOrderStatus);

    useEffect(()=>{
        if(statusUpdateData){
            toast(statusUpdateData?.message,{type:"success"});
            //update the selected user after refetching
            refetch().then((data)=>{
                const foodCategory = data.data?.data;
                if(selectedOrder){
                    setSelectedOrder((prev)=>{
                        const currentCategory = foodCategory?.filter(
                            (order:TypeOrder)=>(order.id===selectedOrder.id)
                        )[0];
                        return currentCategory;
                    })
                }
            })
        }
    },[statusUpdateData,statusUpdateError])
    const [selectedOrder, setSelectedOrder] = useState<TypeOrder | null>(null);
    const handleOrderModalClose = ()=>{
        setSelectedOrder(null);
    }

    //redirect page
    const finished = usePageRedirect("View Orders");
    if(!finished) return <Loading type="full"/>
    return (
        <div className="ag-theme-alpine h-full w-full" ref={tableRef}>
            {selectedOrder?<Backdrop onClick={handleOrderModalClose}>
                <OrderModal
                    order={selectedOrder}
                    onClose={handleOrderModalClose}
                    changeStatus={requestStatusUpdate}
                    isStatusChangeLoading={isStatusUpdateLoading}
                />
            </Backdrop>:null}
            <AgGridReact
                context={{
                    setSelectedOrder,
                    requestStatusUpdate,
                    isStatusUpdateLoading,
                }}
                ref={gridRef}
                rowData={response?.data}
                columnDefs={columnDefs}
                rowHeight={55}
                rowStyle={{width:"100%"}}
                overlayLoadingTemplate={
                    '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>'
                }
                rowDragManaged={true}
                containerStyle={{
                    border:"0px solid #fff0"
                }}
            >
            </AgGridReact>
        </div>
    );
}
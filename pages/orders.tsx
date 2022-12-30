import {useRef, useEffect,useState, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { columnDefs, TypeOrder } from "../components/TableComponents/order";
import {AiOutlinePrinter,AiOutlineExport} from 'react-icons/ai';
import IconButton from "../components/UIElements/IconButton";
import Backdrop from "../components/Backdrop";
import BaseModal from "../components/modals/BaseModal";
import OrderModal from "../components/modals/OrderModal";


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
    const [rowData] = useState<TypeOrder[]>([
        {_id:"nakdjfjeial",date: "10/10/2015", totalCost: 4000, timeElapsed: "1hr 10min",tableNumber:"A10",status:"Pending",items:[
            {
                amount:20,
                cost: 220,
                img: "/avatar.jpg",
                name: "Chechebsa"
            },
            {
                amount:18,
                cost: 250,
                img: "/bf.jpg",
                name: "Pasta"
            },
            {
                amount:4,
                cost: 125,
                img: "/bf.jpg",
                name: "Tea"
            }
        ]},
        {_id:"nsdknvfkkcd",date: "10/10/2015", totalCost: 4000, timeElapsed: "1hr 10min",tableNumber:"A10",status:"Pending",items:[

        ]},
        {_id:"alksdfj,dfd",date: "10/10/2015", totalCost: 4000, timeElapsed: "1hr 10min",tableNumber:"A10",status:"Started",items:[

        ]},
        {_id:"ueiopaisdfx",date: "10/10/2015", totalCost: 4000, timeElapsed: "1hr 10min",tableNumber:"A10",status:"Cancelled",items:[

        ]},
        {_id:"nalskjsdoto",date: "10/10/2015", totalCost: 4000, timeElapsed: "1hr 10min",tableNumber:"A10",status:"Served",items:[

        ]},
        {_id:"abegkielmdf",date: "10/10/2015", totalCost: 4000, timeElapsed: "1hr 10min",tableNumber:"A10",status:"Served",items:[

        ]},
    ]);
    const [selectedOrder, setSelectedOrder] = useState<TypeOrder | null>(null);
    const handleOrderModalClose = ()=>{
        setSelectedOrder(null);
    }
    return (
            <div className="ag-theme-alpine h-full w-full" ref={tableRef}>
                {selectedOrder&&<Backdrop onClick={handleOrderModalClose}>
                    <OrderModal
                        order={selectedOrder}
                        onClose={handleOrderModalClose}
                    />
                </Backdrop>}
                <AgGridReact
                    context={{setSelectedOrder}}
                    ref={gridRef}
                    rowData={rowData}
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
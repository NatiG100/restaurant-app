import {useRef, useEffect,useState, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {AiOutlinePrinter,AiOutlineExport} from 'react-icons/ai';
import IconButton from "../../components/UIElements/IconButton";
import { columnDefs, defaultColDef, TypeDrink } from "../../components/TableComponents/drinks";


export default function DrinkCategories({setAppBarComponent}:any){
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
    const [rowData] = useState<TypeDrink[]>([
        {
            id:"ahxjbnaiosdufneuil",
            categoryId:"1200padkjfthisthat",
            img:"/dinner.jpg",
            name:"Firfir",
            description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            created:"10/3/2023",
            updated:"12/7/2023",
            status:"Active",
            cost:120,
            createdBy:"adkfjalksdjfk",
            imgs:[],
            totalSale:200,
        },
        {
            id:"adfasdfsdgsfgsdfgs",
            categoryId:"1200padkjfthisthat",
            img:"/dinner.jpg",
            name:"Shiro",
            description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            created:"10/3/2023",
            updated:"12/7/2023",
            status:"Active",
            cost:120,
            createdBy:"adkfjalksdjfk",
            imgs:[],
            totalSale:200,
        },
        {
            id:"adlskfjasdkfjkjm",
            categoryId:"thereisanarmyrising",
            img:"/dinner.jpg",
            name:"Beyaynet",
            description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            created:"10/3/2023",
            updated:"12/7/2023",
            status:"Active",
            cost:120,
            createdBy:"adkfjalksdjfk",
            imgs:[],
            totalSale:200,
        },
        {
            id:"alkjsdfkjadkfjfd",
            categoryId:"thereisanarmyrising",
            img:"/dinner.jpg",
            name:"Key Wot",
            description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            created:"10/3/2023",
            updated:"12/7/2023",
            status:"Active",
            cost:120,
            createdBy:"adkfjalksdjfk",
            imgs:[],
            totalSale:200,
        },
        {
            id:"namtoieuuuuwlkfds",
            categoryId:"rockofagescleftfor",
            img:"/dinner.jpg",
            name:"Fetira",
            description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            created:"10/3/2023",
            updated:"12/7/2023",
            status:"Active",
            cost:120,
            createdBy:"adkfjalksdjfk",
            imgs:[],
            totalSale:200,
        },
        {
            id:"betsklkdkkfddfss",
            categoryId:"rockofagescleftfor",
            img:"/dinner.jpg",
            name:"Chechebsa",
            description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            created:"10/3/2023",
            updated:"12/7/2023",
            status:"Active",
            cost:120,
            createdBy:"adkfjalksdjfk",
            imgs:[],
            totalSale:200,
        },
    ]);

    return (
            <div className="ag-theme-alpine h-full w-full" ref={tableRef}>
                <AgGridReact
                    ref={gridRef}
                    rowData={rowData}
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
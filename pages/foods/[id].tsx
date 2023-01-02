import {useRef, useEffect,useState, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {AiOutlineExport} from 'react-icons/ai';
import IconButton from "../../components/UIElements/IconButton";
import { columnDefs, defaultColDef, TypeFood } from "../../components/TableComponents/foods";
import { NextRouter, useRouter } from "next/router";
import Button from "../../components/UIElements/Button";
import Divider from "../../components/UIElements/Divider";
import Backdrop from "../../components/Backdrop";
import FoodTableViewModal from "../../components/modals/foodTableModals/FoodTableViewModal";
import {GoPlus as PlusIcon} from 'react-icons/go';
import CreateFoodModal from "../../components/modals/foodTableModals/CreateFoodModal";



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
    const handleCreateNewFoodClicked = ()=>{

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
    const [filteredRows,setFilteredRows] = useState<TypeFood[]>([]);
    const [rowData] = useState<TypeFood[]>([
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
    
    useEffect(()=>{
        if(id){
            setFilteredRows(rowData.filter((row)=>(row.categoryId===id)));
        }
    },[id]);
    const [selectedFood, setSelectedFood] = useState<TypeFood | null>(null);
    const handleFoodViewModalClose = ()=>{
        setSelectedFood(null);
    }
    return (
            <div className="ag-theme-alpine h-full w-full" ref={tableRef}>
                {   selectedFood&&
                    <Backdrop onClick={handleFoodViewModalClose}>
                        <FoodTableViewModal food={selectedFood} onClose={handleFoodViewModalClose}/>
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
                    rowData={filteredRows}
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
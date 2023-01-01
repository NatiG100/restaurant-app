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


export default function DrinkCategories({setAppBarComponent}:any){
    const tableRef = useRef<HTMLDivElement>(null);
    // get ag-grid api ref
    const gridRef = useRef<AgGridReact>(null);

    //state logic for create new category modal
    const [openModal,setOpenModal] = useState<boolean>(false);
    const handleCreateModalClose = () =>{
        setOpenModal(false);
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
    const [rowData] = useState<TypeFoodCategory[]>([
        {
            id:"1200padkjfthisthat",
            img:"/dinner.jpg",
            name:"Dinner",
            description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            created:"10/3/2023",
            updated:"12/7/2023",
            foodCount:23,
            status:"Active"
        },
        {
            id:"thereisanarmyrising",
            img:"/bf.jpg",
            name:"Lunch",
            description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            created:"10/3/2023",
            updated:"12/7/2023",
            foodCount:23,
            status:"Active"
        },
        {
            id:"rockofagescleftfor",
            img:"/dessert.jpg",
            name:"Dessert",
            description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            created:"10/3/2023",
            updated:"12/7/2023",
            foodCount:23,
            status:"Suspended"
        },
    ]);
    const router = useRouter();
    const handleClick = (event:RowClickedEvent<TypeFoodCategory>)=>{
        const id = event.data?.id;
        router.push('/foods/'+id);
    }
    const [selectedFoodCategory,setSelectedFoodCategory] = useState<TypeFoodCategory|null>(null);
    const handleModalClose = ()=>{
        setSelectedFoodCategory(null);
    }
    return (
            <div className="ag-theme-alpine h-full w-full" ref={tableRef}>
                {
                    selectedFoodCategory&&
                    <Backdrop onClick={handleModalClose}>
                        <FoodCategoriesModal
                            onClose={handleModalClose}
                            category={selectedFoodCategory}
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
                        setSelectedFoodCategory
                    }}
                    onRowDoubleClicked={handleClick}
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
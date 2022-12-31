import {BiSave as SaveIcon} from 'react-icons/bi'
import { TypeFoodCategory } from "../TableComponents/foodCategories";
import { TypeIconButton } from '../UIElements/IconButton';
import LabledInput from '../UIElements/LabledInput';
import BaseModal from "./BaseModal";

export interface TypeFoodCatagoriesModal{
    category:TypeFoodCategory,
    onClose:()=>void
}

const classes = {
    headerText:"text-lg font-bold text-gray-700",
    text:"text-lg text-gray-500",
    container:"grid grid-rows-maxmax w-full my-2",
    twoCols:"grid grid-cols-1fr1fr",
}

const statusClass = (category:TypeFoodCategory)=>{
     if(category.status==="Suspended"){
        return "text-lg text-red-600"
    }
    else if(category.status==="Active"){
        return "text-lg text-green-600"
    }
}

export default function FoodCategoriesModal({category,onClose}:TypeFoodCatagoriesModal){
    const actionButtons:TypeIconButton[] = [
        {
            children:"Save Changes",
            iconEnd:<SaveIcon/>,
            className:"w-28",
            color:"warning",
        }
    ];
    if(category.status==='Active'){
        actionButtons.push({
            type:"outline",
            children:"Deactivate",
            color: "error",
            className:"w-24",
        });
    } else if(category.status==="Suspended"){
        actionButtons.push({
            type:"outline",
            children:"Activate",
            color: "success",
            className:"w-24",
        });
    }
    return(
        <BaseModal
            headerSection={
                <p className="text-xl font-bold text-indigo-600">{category.name}</p>
            }
            onClose={onClose}
            actions={actionButtons}
        >
            <div className='w-full'>
                <div className={classes.container}>
                    <p className={classes.headerText}>ID</p>
                    <p className={classes.text}>{category.id}</p>
                </div>
                <div className={classes.twoCols}>
                    <div className={classes.container}>
                        <p className={classes.headerText}>Created</p>
                        <p className={classes.text}>{category.created}</p>
                    </div>
                    <div className={classes.container}>
                        <p className={classes.headerText}>Updated</p>
                        <p className={classes.text}>{category.updated}</p>
                    </div>
                </div>
                <div className={classes.twoCols}>
                    <div className={classes.container}>
                        <p className={classes.headerText}>Food Count</p>
                        <p className={classes.text}>{category.foodCount}</p>
                    </div>
                    <div className={classes.container}>
                        <p className={classes.headerText}>Status</p>
                        <p className={statusClass(category)}>{category.status}</p>
                    </div>
                </div>
                <LabledInput
                    inputProps={{name:"name", placeholder:"Name",value:category.name}}
                    label="Name"
                    fullWidth
                />
                <LabledInput
                    inputProps={{name:"Description",multiple:true,min:3,max:3, value:category.description}}
                    label="Name"
                    fullWidth
                />
            </div>
        </BaseModal>
    );
}
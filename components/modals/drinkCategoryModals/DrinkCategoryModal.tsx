import { useState } from 'react';
import {BiSave as SaveIcon} from 'react-icons/bi'
import SingleImageUpload from '../../SingleImageUpload';
import { TypeDrinkCategory } from '../../TableComponents/drinkCategories';
import Divider from '../../UIElements/Divider';
import { TypeIconButton } from '../../UIElements/IconButton';
import LabledInput from '../../UIElements/LabledInput';
import LabledTextarea from '../../UIElements/LabledTextArea';
import BaseModal from "./../BaseModal";

export interface TypeDrinkCatagoriesModal{
    category:TypeDrinkCategory,
    onClose(event: void | React.MouseEvent<HTMLButtonElement>):void
}

const classes = {
    headerText:"text-lg font-bold text-gray-700",
    text:"text-lg text-gray-500",
    container:"grid grid-rows-maxmax w-full my-2",
    twoCols:"grid grid-cols-1fr1fr",
}

const statusClass = (category:TypeDrinkCategory)=>{
     if(category.status==="Suspended"){
        return "text-lg text-red-600"
    }
    else if(category.status==="Active"){
        return "text-lg text-green-600"
    }
}

export default function DrinkCategoriesModal({category,onClose}:TypeDrinkCatagoriesModal){
    const actionButtons:TypeIconButton[] = [
        {
            type:"outline",
            children:"Save Changes",
            iconEnd:<SaveIcon/>,
            className:"w-36",
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
    const [drinkCategoryImg,setDrinkCategoryImg] = useState<string>(category.img);
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
                        <p className={classes.text}>{category.drinkCount}</p>
                    </div>
                    <div className={classes.container}>
                        <p className={classes.headerText}>Status</p>
                        <p className={statusClass(category)}>{category.status}</p>
                    </div>
                </div>
                <Divider className='w-full my-4'/>
                <div className='w-full flex flex-col gap-3 pt-3'>
                    <SingleImageUpload
                        img={drinkCategoryImg}
                        setImg={setDrinkCategoryImg}
                    />
                    <LabledInput
                        inputProps={{name:"name", placeholder:"Name",value:category.name}}
                        label="Name"
                        fullWidth
                    />
                    <LabledTextarea
                        inputProps={{name:"description", value:category.description,rows:4,style:{resize:"none"}}}
                        label="Description"
                        fullWidth
                    />
                </div>
            </div>
        </BaseModal>
    );
}
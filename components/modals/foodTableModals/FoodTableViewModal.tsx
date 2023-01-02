import { TypeFood } from '../../TableComponents/foods'
import { TypeIconButton } from '../../UIElements/IconButton';
import BaseModal from '../BaseModal';
import {BiSave as SaveIcon} from 'react-icons/bi'
import Divider from '../../UIElements/Divider';
import SingleImageUpload from '../../SingleImageUpload';
import {useState} from 'react';
import LabledInput from '../../UIElements/LabledInput';
import LabledTextarea from '../../UIElements/LabledTextArea';

export interface TypeFoodTableViewModal{
    food:TypeFood,
    onClose(event: void | React.MouseEvent<HTMLButtonElement>):void,
}
export default function FoodTableViewModal({onClose, food}:TypeFoodTableViewModal){
    const actionButtons:TypeIconButton[] = [
        {
            type:"outline",
            children:"Save Changes",
            iconEnd:<SaveIcon/>,
            className:"w-36",
            color:"warning",
        }
    ];
    if(food.status==='Active'){
        actionButtons.push({
            type:"outline",
            children:"Deactivate",
            color: "error",
            className:"w-24",
        });
    } else if(food.status==="Suspended"){
        actionButtons.push({
            type:"outline",
            children:"Activate",
            color: "success",
            className:"w-24",
        });
    }

    const classes = {
        headerText:"text-lg font-bold text-gray-700",
        text:"text-lg text-gray-500",
        container:"grid grid-rows-maxmax w-full my-2",
        twoCols:"grid grid-cols-1fr1fr",
    }
    
    const statusClass = (food:TypeFood)=>{
         if(food.status==="Suspended"){
            return "text-lg text-red-600"
        }
        else if(food.status==="Active"){
            return "text-lg text-green-600"
        }
    }
    const [foodImg,setFoodImg] = useState<string>(food.img);
    return(
        <BaseModal
            headerSection={<p className='text-xl font-bold text-indigo-600'>{food.name}</p>}
            actions={actionButtons}
            onClose={onClose}
        >
            <div className='flex flex-col gap-2 w-full'>
                <div className={classes.container}>
                    <p className={classes.headerText}>ID</p>
                    <p className={classes.text}>{food.id}</p>
                </div>
                <div className={classes.twoCols}>
                    <div className={classes.container}>
                        <p className={classes.headerText}>Created</p>
                        <p className={classes.text}>{food.created}</p>
                    </div>
                    <div className={classes.container}>
                        <p className={classes.headerText}>Updated</p>
                        <p className={classes.text}>{food.updated}</p>
                    </div>
                </div>
                <div className={classes.twoCols}>
                    <div className={classes.container}>
                        <p className={classes.headerText}>Created By</p>
                        <p className={classes.text}>{food.createdBy}</p>
                    </div>
                    <div className={classes.container}>
                        <p className={classes.headerText}>Status</p>
                        <p className={statusClass(food)}>{food.status}</p>
                    </div>
                </div>
                <Divider className='w-full my-4'/>
                <div className='w-full flex flex-col gap-3 pt-3'>
                    <SingleImageUpload
                        img={foodImg}
                        setImg={setFoodImg}
                    />
                    <LabledInput
                        inputProps={{name:"name", placeholder:"Name",value:food.name}}
                        label="Name"
                        fullWidth
                    />
                    <LabledTextarea
                        inputProps={{name:"description", value:food.description,rows:4,style:{resize:"none"}}}
                        label="Description"
                        fullWidth
                    />
                </div>
            </div>
        </BaseModal>
    );
}
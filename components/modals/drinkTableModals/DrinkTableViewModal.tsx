import { TypeIconButton } from '../../UIElements/IconButton';
import BaseModal from '../BaseModal';
import {BiSave as SaveIcon} from 'react-icons/bi'
import Divider from '../../UIElements/Divider';
import SingleImageUpload from '../../SingleImageUpload';
import {useState} from 'react';
import LabledInput from '../../UIElements/LabledInput';
import LabledTextarea from '../../UIElements/LabledTextArea';
import { TypeDrink } from '../../TableComponents/drinks';

export interface TypeDrinkTableViewModal{
    drink:TypeDrink,
    onClose(event: void | React.MouseEvent<HTMLButtonElement>):void,
}
export default function DrinkTableViewModal({onClose, drink}:TypeDrinkTableViewModal){
    const actionButtons:TypeIconButton[] = [
        {
            type:"outline",
            children:"Save Changes",
            iconEnd:<SaveIcon/>,
            className:"w-36",
            color:"warning",
        }
    ];
    if(drink.status==='Active'){
        actionButtons.push({
            type:"outline",
            children:"Deactivate",
            color: "error",
            className:"w-24",
        });
    } else if(drink.status==="Suspended"){
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
    
    const statusClass = (drink:TypeDrink)=>{
         if(drink.status==="Suspended"){
            return "text-lg text-red-600"
        }
        else if(drink.status==="Active"){
            return "text-lg text-green-600"
        }
    }
    const [drinkImg,setdrinkImg] = useState<string>(drink.img);
    return(
        <BaseModal
            headerSection={<p className='text-xl font-bold text-indigo-600'>{drink.name}</p>}
            actions={actionButtons}
            onClose={onClose}
        >
            <div className='flex flex-col gap-2 w-full'>
                <div className={classes.container}>
                    <p className={classes.headerText}>ID</p>
                    <p className={classes.text}>{drink.id}</p>
                </div>
                <div className={classes.twoCols}>
                    <div className={classes.container}>
                        <p className={classes.headerText}>Created</p>
                        <p className={classes.text}>{drink.created}</p>
                    </div>
                    <div className={classes.container}>
                        <p className={classes.headerText}>Updated</p>
                        <p className={classes.text}>{drink.updated}</p>
                    </div>
                </div>
                <div className={classes.twoCols}>
                    <div className={classes.container}>
                        <p className={classes.headerText}>Created By</p>
                        <p className={classes.text}>{drink.createdBy}</p>
                    </div>
                    <div className={classes.container}>
                        <p className={classes.headerText}>Status</p>
                        <p className={statusClass(drink)}>{drink.status}</p>
                    </div>
                </div>
                <Divider className='w-full my-4'/>
                <div className='w-full flex flex-col gap-3 pt-3'>
                    <SingleImageUpload
                        img={drinkImg}
                        setImg={setdrinkImg}
                    />
                    <LabledInput
                        inputProps={{name:"name", placeholder:"Name",value:drink.name}}
                        label="Name"
                        fullWidth
                    />
                    <LabledTextarea
                        inputProps={{name:"description", value:drink.description,rows:4,style:{resize:"none"}}}
                        label="Description"
                        fullWidth
                    />
                </div>
            </div>
        </BaseModal>
    );
}
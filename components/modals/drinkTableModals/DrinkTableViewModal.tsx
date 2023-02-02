import { TypeIconButton } from '../../UIElements/IconButton';
import BaseModal from '../BaseModal';
import {BiSave as SaveIcon} from 'react-icons/bi'
import Divider from '../../UIElements/Divider';
import SingleImageUpload from '../../SingleImageUpload';
import {useState} from 'react';
import LabledInput from '../../UIElements/LabledInput';
import LabledTextarea from '../../UIElements/LabledTextArea';
import { TypeDrink } from '../../TableComponents/drinks';
import baseURL from '../../../constants/BASE_URL';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { TypeCustomeErrorResponse, TypeMultiDataResponse } from '../../../types/types';
import { TypeChangeDrinkStatus, TypeUpdateDrink, updateDrink } from '../../../services/DrinkService';
import {useEffect} from 'react'
import { toast } from 'react-toastify';

export interface TypeDrinkTableViewModal{
    drink:TypeDrink,
    onClose(event: void | React.MouseEvent<HTMLButtonElement>):void,
    changeStatus:({status,id}:TypeChangeDrinkStatus)=>void,
    isStatusChangeLoading:boolean
}
export default function DrinkTableViewModal({onClose, drink,changeStatus,isStatusChangeLoading}:TypeDrinkTableViewModal){
    const [drinkImg,setdrinkImg] = useState<string>(baseURL+drink.img);
    const [imgFile,setImgFile] = useState<File|null>(null)

    //react jppl fpr
    const {
        register,
        formState:{errors},
        handleSubmit,
    }  = useForm<{name:string,cost:Number,description:string}>({
        defaultValues:{
            name:drink.name,
            cost:drink.cost,
            description:drink.description
        }
    });
    //form submission logic
    const {mutate:requestUpdateDrink,isLoading,data,error} = 
        useMutation<TypeMultiDataResponse,TypeCustomeErrorResponse,TypeUpdateDrink>(updateDrink);
    const onSubmit = (data:{name:string,cost:Number,description:string})=>{
        requestUpdateDrink({
            name:data.name,
            cost:data.cost,
            img:imgFile,
            description:data.description,
            id:drink.id,
        })
    }
    //toastify
    useEffect(()=>{
        if(error){
            toast(error?.message,{type:"error"});
        }if(data){
            toast(data?.message,{type:"success"});
            onClose();
        }
    },[error,data]);
    const actionButtons:TypeIconButton[] = [
        {
            type:"outline",
            children:"Save Changes",
            iconEnd:<SaveIcon/>,
            className:"w-36",
            color:"warning",
            disabled:isLoading,
            onClick:()=>{},
            butonProps:{
                form:"updateDrink"
            }
        }
    ];
    if(drink.status==='Active'){
        actionButtons.push({
            type:"outline",
            children:"Deactivate",
            color: "error",
            className:"w-24",
            disabled:isStatusChangeLoading,
            onClick:()=>{changeStatus({status:"Suspended",id:drink.id})}
        });
    } else if(drink.status==="Suspended"){
        actionButtons.push({
            type:"outline",
            children:"Activate",
            color: "success",
            className:"w-24",
            disabled:isStatusChangeLoading,
            onClick:()=>{changeStatus({status:"Active",id:drink.id})}
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
                        setFile={setImgFile}
                    />
                    <form id="updateDrink" onSubmit={handleSubmit(onSubmit)}>
                        <LabledInput
                            inputProps={{
                                ...register('name',{required:"Cost is required"}),
                                placeholder:"Name"
                            }}
                            label="Name"
                            fullWidth
                            error={errors.name?.message}
                        />
                        <LabledInput
                            inputProps={{
                                ...register('cost',{required:"Cost is required"}),
                                placeholder:"Cost",
                                type:"number",
                            }}
                            label="Cost"
                            fullWidth
                            error={errors.cost?.message}
                        />
                        <LabledTextarea
                            inputProps={{
                                ...register('description'),
                                placeholder:"Description", 
                                rows:4,style:{resize:"none"}
                            }}
                            label="Description"
                            fullWidth
                        />
                    </form>
                </div>
            </div>
        </BaseModal>
    );
}
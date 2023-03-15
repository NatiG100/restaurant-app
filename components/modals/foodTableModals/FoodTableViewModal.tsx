import { TypeFood } from '../../TableComponents/foods'
import { TypeIconButton } from '../../UIElements/IconButton';
import BaseModal from '../BaseModal';
import {BiSave as SaveIcon} from 'react-icons/bi'
import Divider from '../../UIElements/Divider';
import SingleImageUpload from '../../SingleImageUpload';
import {useEffect, useState} from 'react';
import LabledInput from '../../UIElements/LabledInput';
import LabledTextarea from '../../UIElements/LabledTextArea';
import baseURL from '../../../constants/BASE_URL';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { TypeCustomeErrorResponse, TypeMultiDataResponse } from '../../../types/types';
import { TypeChangeFoodStatus, TypeUpdateFood, updateFood } from '../../../services/FoodService';
import { toast } from 'react-toastify';

export interface TypeFoodTableViewModal{
    food:TypeFood,
    onClose(event: void | React.MouseEvent<HTMLButtonElement>):void,
    changeStatus:({status,id}:TypeChangeFoodStatus)=>void,
    isStatusChangeLoading:boolean
}
export default function FoodTableViewModal({onClose, food, changeStatus,isStatusChangeLoading}:TypeFoodTableViewModal){
    
    const [foodImg,setFoodImg] = useState<string>(baseURL+food.img);
    const [imgFile,setImgFile] = useState<File|null>(null)

    //react jppl fpr
    const {
        register,
        formState:{errors},
        handleSubmit,
    }  = useForm<{name:string,cost:Number,description:string}>({
        defaultValues:{
            name:food.name,
            cost:food.cost,
            description:food.description
        }
    });
    //form submission logic
    const {mutate:requestUpdateFood,isLoading,data,error} = 
        useMutation<TypeMultiDataResponse,TypeCustomeErrorResponse,TypeUpdateFood>(updateFood);
    const onSubmit = (data:{name:string,cost:Number,description:string})=>{
        requestUpdateFood({
            name:data.name,
            cost:data.cost,
            img:imgFile,
            description:data.description,
            id:food.id,
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
    },[error,data])
    const actionButtons:TypeIconButton[] = [
        {
            type:"outline",
            children:"Save Changes",
            iconEnd:<SaveIcon/>,
            className:"w-36",
            color:"warning",
            disabled:isLoading,
            onClick:()=>{},
            buttonProps:{
                form:"updateFood"
            }
        }
    ];
    if(food.status==='Active'){
        actionButtons.push({
            type:"outline",
            children:"Deactivate",
            color: "error",
            className:"w-24",
            disabled:isStatusChangeLoading,
            onClick:()=>{changeStatus({status:"Suspended",id:food.id})}
        });
    } else if(food.status==="Suspended"){
        actionButtons.push({
            type:"outline",
            children:"Activate",
            color: "success",
            className:"w-24",
            disabled:isStatusChangeLoading,
            onClick:()=>{changeStatus({status:"Active",id:food.id})}
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
                        setFile={setImgFile}
                    />
                    <form id="updateFood" onSubmit={handleSubmit(onSubmit)}>
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
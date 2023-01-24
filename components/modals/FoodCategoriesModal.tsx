import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {BiSave as SaveIcon} from 'react-icons/bi'
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import baseURL from '../../constants/BASE_URL';
import { TypeChangeFoodCategoryStatus, TypeUpdateFoodCategory, updateFoodCategory } from '../../services/FoodCategoryService';
import { TypeCustomeErrorResponse, TypeMultiDataResponse } from '../../types/types';
import SingleImageUpload from '../SingleImageUpload';
import { TypeFoodCategory } from "../TableComponents/foodCategories";
import Divider from '../UIElements/Divider';
import { TypeIconButton } from '../UIElements/IconButton';
import LabledInput from '../UIElements/LabledInput';
import LabledTextarea from '../UIElements/LabledTextArea';
import BaseModal from "./BaseModal";

export interface TypeFoodCatagoriesModal{
    category:TypeFoodCategory,
    onClose(event: void | React.MouseEvent<HTMLButtonElement>):void,
    changeStatus:({status,id}:TypeChangeFoodCategoryStatus)=>void,
    isStatusChangeLoading:boolean
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

export default function FoodCategoriesModal({category,onClose,changeStatus,isStatusChangeLoading}:TypeFoodCatagoriesModal){

    const [foodCategoryImg,setFoodCategoryImg] = useState<string>(baseURL+category.img);
    const [imgFile,setImgFile] = useState<File|null>(null);
    //react hook form
    const {
        register,
        formState:{errors},
        handleSubmit
    } = useForm<{name:string,description:string}>({
        defaultValues:{
            name:category.name,
            description:category.description
        }
    });

    //form submission logic
    const {mutate:requestFoodCategoryUpdate,error,data,isLoading} = 
    useMutation<TypeMultiDataResponse,TypeCustomeErrorResponse,TypeUpdateFoodCategory>(updateFoodCategory);
    const onSubmit = (data:{name:string,description:string})=>{
        requestFoodCategoryUpdate({
            data:{
                name:data.name,
                description:data.description,
                img:imgFile,
            },
            id:category.id
        });
    }

    //toastify
    useEffect(()=>{
        if(error){
            toast(error?.message,{type:"error"});
        }if(data){
            toast(data?.message);
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
            butonProps:{
                form:"updateFoodCategory"
            }
        }
    ];
    if(category.status==='Active'){
        actionButtons.push({
            type:"outline",
            children:"Deactivate",
            color: "error",
            className:"w-24",
            onClick:()=>changeStatus({id:category.id,status:"Suspended"}),
            disabled:isStatusChangeLoading
        });
    } else if(category.status==="Suspended"){
        actionButtons.push({
            type:"outline",
            children:"Activate",
            color: "success",
            className:"w-24",
            onClick:()=>changeStatus({id:category.id,status:"Active"}),
            disabled:isStatusChangeLoading
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
                <Divider className='w-full my-4'/>
                <div className='w-full flex flex-col gap-3 pt-3'>
                    <SingleImageUpload
                        img={foodCategoryImg}
                        setImg={setFoodCategoryImg}
                        setFile={setImgFile}
                    />
                    <form id="updateFoodCategory" onSubmit={handleSubmit(onSubmit)}>
                        <LabledInput
                            inputProps={{
                                ...register("name",{required:"Category name is required"}),
                                placeholder:"Name"
                            }}
                            label="Name"
                            fullWidth
                            error={errors.name?.message}
                        />
                        <LabledTextarea
                            inputProps={{
                                ...register("description"),
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
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {BiSave as SaveIcon} from 'react-icons/bi'
import { useMutation } from 'react-query';
import baseURL from '../../../constants/BASE_URL';
import { TypeChangeDrinkCategoryStatus, TypeUpdateDrinkCategory, updateDrinkCategory } from '../../../services/DrinkCategoryService';
import { TypeCustomeErrorResponse, TypeMultiDataResponse } from '../../../types/types';
import SingleImageUpload from '../../SingleImageUpload';
import { TypeDrinkCategory } from '../../TableComponents/drinkCategories';
import Divider from '../../UIElements/Divider';
import { TypeIconButton } from '../../UIElements/IconButton';
import LabledInput from '../../UIElements/LabledInput';
import LabledTextarea from '../../UIElements/LabledTextArea';
import BaseModal from "./../BaseModal";
import {useEffect} from 'react'
import { toast } from 'react-toastify';
import useRequireauthorize from '../../../hooks/useRequireAuthorization';

export interface TypeDrinkCatagoriesModal{
    category:TypeDrinkCategory,
    onClose(event: void | React.MouseEvent<HTMLButtonElement>):void,
    changeStatus:({status,id}:TypeChangeDrinkCategoryStatus)=>void,
    isStatusChangeLoading:boolean
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

export default function DrinkCategoriesModal({category,onClose,changeStatus,isStatusChangeLoading}:TypeDrinkCatagoriesModal){
    const [drinkCategoryImg,setDrinkCategoryImg] = useState<string>(baseURL+category.img);
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
    const {mutate:requestDrinkCategoryUpdate,error,data,isLoading} = 
    useMutation<TypeMultiDataResponse,TypeCustomeErrorResponse,TypeUpdateDrinkCategory>(updateDrinkCategory);
    const onSubmit = (data:{name:string,description:string})=>{
        requestDrinkCategoryUpdate({
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
    },[error,data]);

    const isAuthorized = useRequireauthorize({requiredPrevilage:"Manage Items"});
    const [actionButtons,setActionButtons] = useState<TypeIconButton[]>([]);
    useEffect(()=>{
        let authorizedActions:TypeIconButton[] =[]; 
        if(isAuthorized){
            authorizedActions = [
                {
                    type:"outline",
                    children:"Save Changes",
                    iconEnd:<SaveIcon/>,
                    className:"w-36",
                    color:"warning",
                    disabled:isLoading,
                    buttonProps:{
                        form:"updateDrinkCategory"
                    }
                }
            ];
            if(category.status==='Active'){
                authorizedActions.push({
                    type:"outline",
                    children:"Deactivate",
                    color: "error",
                    className:"w-24",
                    onClick:()=>changeStatus({id:category.id,status:"Suspended"}),
                    disabled:isStatusChangeLoading
                });
            } else if(category.status==="Suspended"){
                authorizedActions.push({
                    type:"outline",
                    children:"Activate",
                    color: "success",
                    className:"w-24",
                    onClick:()=>changeStatus({id:category.id,status:"Active"}),
                    disabled:isStatusChangeLoading
                });
            }
            setActionButtons(authorizedActions);
        }
    },[isAuthorized,category])
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
                        setFile={setImgFile}
                    />
                    <form id="updateDrinkCategory" onSubmit={handleSubmit(onSubmit)}>
                        <LabledInput
                            inputProps={{
                                ...register("name",{required:"Category name is required"}),
                                placeholder:"Name",
                                disabled:!isAuthorized
                            }}
                            label="Name"
                            fullWidth
                            error={errors.name?.message}
                        />
                        <LabledTextarea
                            inputProps={{
                                ...register("description"),
                                rows:4,style:{resize:"none"},
                                disabled:!isAuthorized
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
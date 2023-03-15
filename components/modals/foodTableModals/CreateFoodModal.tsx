import BaseModal from "../BaseModal";
import {GoPlus as PlusIcon} from 'react-icons/go';
import SingleImageUpload from "../../SingleImageUpload";
import LabledInput from "../../UIElements/LabledInput";
import LabledTextarea from "../../UIElements/LabledTextArea";
import {useEffect, useState} from 'react';
import { useMutation } from "react-query";
import { TypeCustomeErrorResponse, TypeMultiDataResponse } from "../../../types/types";
import { addFood, TypeAddFood } from "../../../services/FoodService";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export interface TypeCreateFoodModal{
    onClose: ()=>void,
    categoryId:string
}

export default function ({onClose,categoryId}:TypeCreateFoodModal){
    const [foodImg,setFoodImg] = useState<string | null>(null);
    const [imgFile,setImgFile] = useState<File|null>(null);
    //api mutation
    const {
        mutate,
        isLoading,
        error,
        data
    } = useMutation<
        TypeMultiDataResponse,
        TypeCustomeErrorResponse,
        TypeAddFood>(addFood);

    //form validation
    const {
        register,
        handleSubmit,
        formState:{errors}
    } = useForm<{name:string,description:string,cost:Number}>();

    //notify
    useEffect(()=>{
        if(data){
            toast(data.message,{type:"success"});
            onClose();
        }
        if(error){
            toast(error.message,{type:"error"});
        }
    },[data,error])

    //form submission
    const onSubmit = (data:{name:string,description:string,cost:Number})=>{
        mutate({
            name:data.name,
            description:data.description,
            cost:data.cost,
            categoryId:categoryId,
            img:imgFile
        });
    }


    return (
        <BaseModal
            onClose={onClose}
            actions={[{
                children:"Create",
                color:"success",
                className:"w-24",
                type:"outline",
                disabled:isLoading,
                iconEnd:<PlusIcon/>,
                onClick:()=>{},
                buttonProps:{form:"addFood"},
            }]}
            headerSection={
                <p className="text-xl font-bold text-indigo-700">Create Food</p>
            }
        >
            <div>
                <SingleImageUpload
                    img={foodImg}
                    setImg={setFoodImg}
                    setFile={setImgFile}
                />
                <form id="addFood" onSubmit={handleSubmit(onSubmit)}>
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
        </BaseModal>
    );
}
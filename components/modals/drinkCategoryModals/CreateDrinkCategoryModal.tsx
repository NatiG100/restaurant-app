import { useState } from "react";
import SingleImageUpload from "../../SingleImageUpload";
import LabledInput from "../../UIElements/LabledInput";
import LabledTextarea from "../../UIElements/LabledTextArea";
import BaseModal from "./../BaseModal";
import {GoPlus as PlusIcon} from 'react-icons/go';
import { useMutation } from "react-query";
import { TypeCustomeErrorResponse, TypeMultiDataResponse } from "../../../types/types";
import { TypeAddFoodCategory } from "../../../services/FoodCategoryService";
import { addDrinkCategory } from "../../../services/DrinkCategoryService";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {useEffect} from 'react';

export interface TypeCreateDrinkCategoryModal{
    onClose:()=>void
}

export default function CreateDrinkCategoryModal({onClose}:TypeCreateDrinkCategoryModal){
    const [categoryImage,setCategoryImage] = useState<string | null>(null);
    const [imgFile,setImgFile] = useState<File|null>(null);

    //form validation and submission logic
    const {mutate:requestAddDrinkCategory,isLoading,data,error} 
        = useMutation<TypeMultiDataResponse,TypeCustomeErrorResponse,TypeAddFoodCategory>(addDrinkCategory);
    const {register,formState:{errors},handleSubmit} = useForm<{name:string,description:string}>();
    const onSubmit=(data:{name:string,description:string})=>{
        requestAddDrinkCategory({
            name:data.name,
            description:data.description,
            img:imgFile,
        })
    }
    //tostify
    useEffect(()=>{
        if(error){
            toast(error?.message,{type:"error"});
        }if(data){
            toast(data?.message);
            onClose();
        }
    },[error,data])
    return(
        <BaseModal
            onClose={onClose}
            actions={[{
                children:"Create",
                color:"success",
                className:"w-24",
                type:"outline",
                onClick:()=>{},
                iconEnd:<PlusIcon/>,
                disabled:isLoading,
                buttonProps:{
                    form:"addDrinkCategory"
                }
            }]}
            headerSection={
                <p className="text-xl font-bold text-indigo-700">Create Category</p>
            }
        >
            <div className="w-full">
                <SingleImageUpload
                    img={categoryImage}
                    setImg={setCategoryImage}
                    setFile={setImgFile}
                />
                <form id="addDrinkCategory" onSubmit={handleSubmit(onSubmit)}>
                    <LabledInput
                            inputProps={{
                                ...register(
                                    "name",
                                    {required:"Category name is required"}
                                ),
                                placeholder:"Category Name"
                            }}
                            label="Name"
                            fullWidth
                            error={errors.name?.message}
                        />
                    <LabledTextarea
                        inputProps={{
                            ...register(
                                "description",
                            ),
                            placeholder:"Description"
                        }}
                        label="Description"
                        fullWidth
                        error={errors.description?.message}
                    />
                </form>
            </div>
        </BaseModal>
    );
}
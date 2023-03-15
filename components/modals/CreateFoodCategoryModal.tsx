import { useEffect, useState } from "react";
import SingleImageUpload from "../SingleImageUpload";
import LabledInput from "../UIElements/LabledInput";
import LabledTextarea from "../UIElements/LabledTextArea";
import BaseModal from "./BaseModal";
import {GoPlus as PlusIcon} from 'react-icons/go';
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";
import { addFoodCategory, TypeAddFoodCategory } from "../../services/FoodCategoryService";
import {toast} from 'react-toastify';
import { TypeCustomeErrorResponse, TypeMultiDataResponse } from "../../types/types";

export interface TypeCreateFoodCategoryModal{
    onClose:()=>void
}

export default function CreateFoodCategoryModal({onClose}:TypeCreateFoodCategoryModal){
    const [categoryImage,setCategoryImage] = useState<string | null>(null);
    const [imgFile,setImgFile] = useState<File|null>(null);

    //form validation and submission logic
    const {mutate:requestAddFoodCategory,isLoading,data,error} 
        = useMutation<TypeMultiDataResponse,TypeCustomeErrorResponse,TypeAddFoodCategory>(addFoodCategory);
    const {register,formState:{errors},handleSubmit} = useForm<{name:string,description:string}>();
    const onSubmit=(data:{name:string,description:string})=>{
        requestAddFoodCategory({
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
                    form:"addFoodCategory"
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
                <form id="addFoodCategory" onSubmit={handleSubmit(onSubmit)}>
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
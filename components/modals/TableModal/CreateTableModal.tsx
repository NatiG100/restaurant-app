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
import { addTable, TypeAddTable } from "../../../services/TableService";

export interface TypeCreateTableModal{
    onClose: ()=>void,
}

export default function ({onClose}:TypeCreateTableModal){
    //api mutation
    const {
        mutate,
        isLoading,
        error,
        data
    } = useMutation<
        TypeMultiDataResponse,
        TypeCustomeErrorResponse,
        TypeAddTable>(addTable);

    //form validation
    const {
        register,
        handleSubmit,
        formState:{errors}
    } = useForm<{tableNumber:string}>();

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
    const onSubmit = (data:{tableNumber:string})=>{
        mutate({
            tableNumber:data.tableNumber
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
                buttonProps:{form:"addTable"},
            }]}
            headerSection={
                <p className="text-xl font-bold text-indigo-700">Create Table</p>
            }
        >
            <div>
                <form id="addTable" onSubmit={handleSubmit(onSubmit)}>
                    <LabledInput
                        inputProps={{
                            ...register('tableNumber',{required:"Table# is required"}),
                            placeholder:"Name"
                        }}
                        label="Table Number"
                        fullWidth
                        error={errors.tableNumber?.message}
                    />
                </form>
            </div>
        </BaseModal>
    );
}
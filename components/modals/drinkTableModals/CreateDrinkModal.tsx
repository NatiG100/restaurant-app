import BaseModal from "../BaseModal";
import {GoPlus as PlusIcon} from 'react-icons/go';
import SingleImageUpload from "../../SingleImageUpload";
import LabledInput from "../../UIElements/LabledInput";
import LabledTextarea from "../../UIElements/LabledTextArea";
import {useState} from 'react';
import { useMutation } from "react-query";
import { TypeCustomeErrorResponse, TypeMultiDataResponse } from "../../../types/types";
import { addDrink, TypeAddDrink } from "../../../services/DrinkService";
import { useForm } from "react-hook-form";
import {useEffect} from 'react';
import { toast } from "react-toastify";

export interface TypeCreateDrinkModal{
    onClose: ()=>void,
    categoryId:string
}

export default function CreateDrinkModal({onClose,categoryId}:TypeCreateDrinkModal){
    const [drinkImg,setDrinkImg] = useState<string | null>(null);
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
        TypeAddDrink>(addDrink);

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
                butonProps:{form:"addDrink"},
            }]}
            headerSection={
                <p className="text-xl font-bold text-indigo-700">Create Drink</p>
            }
        >
            <div>
                <SingleImageUpload
                    img={drinkImg}
                    setImg={setDrinkImg}
                    setFile={setImgFile}
                />
                <form id="addDrink" onSubmit={handleSubmit(onSubmit)}>
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
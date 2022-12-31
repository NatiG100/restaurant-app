import { useState } from "react";
import SingleImageUpload from "../SingleImageUpload";
import LabledInput from "../UIElements/LabledInput";
import LabledTextarea from "../UIElements/LabledTextArea";
import BaseModal from "./BaseModal";
import {GoPlus as PlusIcon} from 'react-icons/go';

export interface TypeCreateFoodCategoryModal{
    onClose:()=>void
}

export default function CreateFoodCategoryModal({onClose}:TypeCreateFoodCategoryModal){
    const [categoryImage,setCategoryImage] = useState<string | null>(null);
    return(
        <BaseModal
            onClose={onClose}
            actions={[{
                children:"Create",
                color:"success",
                className:"w-24",
                type:"outline",
                onClick:()=>{},
                iconEnd:<PlusIcon/>
            }]}
            headerSection={
                <p className="text-xl font-bold text-indigo-700">Create Category</p>
            }
        >
            <div className="w-full">
                <SingleImageUpload
                    img={categoryImage}
                    setImg={setCategoryImage}
                />
                <LabledInput
                        inputProps={{name:"name", placeholder:"Name"}}
                        label="Name"
                        fullWidth
                    />
                <LabledTextarea
                    inputProps={{name:"description",placeholder:"Description", rows:4,style:{resize:"none"}}}
                    label="Description"
                    fullWidth
                />
            </div>
        </BaseModal>
    );
}
import BaseModal from "../BaseModal";
import {GoPlus as PlusIcon} from 'react-icons/go';
import SingleImageUpload from "../../SingleImageUpload";
import LabledInput from "../../UIElements/LabledInput";
import LabledTextarea from "../../UIElements/LabledTextArea";
import {useState} from 'react';

export interface TypeCreateFoodModal{
    onClose: ()=>void,
}

export default function ({onClose}:TypeCreateFoodModal){
    const [foodImg,setFoodImg] = useState<string | null>(null);
    return (
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
                <p className="text-xl font-bold text-indigo-700">Create Food</p>
            }
        >
            <div>
            <SingleImageUpload
                    img={foodImg}
                    setImg={setFoodImg}
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
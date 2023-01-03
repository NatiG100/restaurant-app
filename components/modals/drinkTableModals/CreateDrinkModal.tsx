import BaseModal from "../BaseModal";
import {GoPlus as PlusIcon} from 'react-icons/go';
import SingleImageUpload from "../../SingleImageUpload";
import LabledInput from "../../UIElements/LabledInput";
import LabledTextarea from "../../UIElements/LabledTextArea";
import {useState} from 'react';

export interface TypeCreateDrinkModal{
    onClose: ()=>void,
}

export default function CreateDrinkModal({onClose}:TypeCreateDrinkModal){
    const [drinkImg,setDrinkImg] = useState<string | null>(null);
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
                <p className="text-xl font-bold text-indigo-700">Create Drink</p>
            }
        >
            <div>
            <SingleImageUpload
                    img={drinkImg}
                    setImg={setDrinkImg}
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
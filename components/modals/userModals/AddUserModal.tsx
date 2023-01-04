import { useState } from "react";
import SingleImageUpload from "../../SingleImageUpload";
import LabledInput from "../../UIElements/LabledInput";
import BaseModal from "./../BaseModal";
import {GoPlus as PlusIcon} from 'react-icons/go';

export interface TypeAddUserModal{
    onClose:()=>void
}

export default function AddUserModal({onClose}:TypeAddUserModal){
    const [userImage,setUserImage] = useState<string | null>(null);
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
                <p className="text-xl font-bold text-indigo-700">Add User</p>
            }
        >
            <div className="w-full">
                <SingleImageUpload
                    img={userImage}
                    setImg={setUserImage}
                />
                <LabledInput
                    inputProps={{name:"name", placeholder:"Name"}}
                    label="Full Name"
                    fullWidth
                />
                <LabledInput
                    inputProps={{name:"email", placeholder:"Email",type:"email"}}
                    label="Email"
                    fullWidth
                />
            </div>
        </BaseModal>
    );
}
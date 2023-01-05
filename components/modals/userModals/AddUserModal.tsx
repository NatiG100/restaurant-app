import { useState } from "react";
import SingleImageUpload from "../../SingleImageUpload";
import LabledInput from "../../UIElements/LabledInput";
import BaseModal from "./../BaseModal";
import {GoPlus as PlusIcon} from 'react-icons/go';
import { allPermissions, TypePermission } from "../../../assets/permissions";
import ToggleChip from "../../UIElements/ToggleChip";
import usePermissionEditor from "../../../hooks/usePermissionEditor";

export interface TypeAddUserModal{
    onClose:()=>void
}



export default function AddUserModal({onClose}:TypeAddUserModal){
    const [userImage,setUserImage] = useState<string | null>(null);
    const {
        selectedPermissions,
        toogglePermission,
        isPermissionOn
    } = usePermissionEditor({})
    const classes = {
        headerText:"text-lg font-bold text-gray-700",
        text:"text-lg text-gray-500",
        container:"grid grid-rows-maxmax w-full my-2",
        twoCols:"grid grid-cols-1fr1fr",
    }
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
            <div className="w-full flex flex-col gap-2">
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
            <div className={classes.container + " pt-4"}>
                <p className={classes.headerText}>Permissions</p>
                <div className="w-full pt-4 flex flex-wrap gap-2">
                    {
                        allPermissions.map((permission)=>(
                            <ToggleChip
                                key={permission}
                                on={isPermissionOn(permission)}
                                onToggle={toogglePermission(permission)}
                            >
                                {permission}
                            </ToggleChip>
                        ))
                    }
                </div>
            </div>
        </BaseModal>
    );
}
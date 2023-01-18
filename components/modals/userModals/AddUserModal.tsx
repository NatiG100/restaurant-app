import { useEffect, useState } from "react";
import SingleImageUpload from "../../SingleImageUpload";
import LabledInput from "../../UIElements/LabledInput";
import BaseModal from "./../BaseModal";
import {GoPlus as PlusIcon} from 'react-icons/go';
import { allPermissions, TypePermission } from "../../../assets/permissions";
import ToggleChip from "../../UIElements/ToggleChip";
import usePermissionEditor from "../../../hooks/usePermissionEditor";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { addUser } from "../../../services/UsersService";
import { toast } from "react-toastify";

export interface TypeAddUserModal{
    onClose:()=>void
}



export default function AddUserModal({onClose}:TypeAddUserModal){
    const [userImage,setUserImage] = useState<string | null>(null);
    const [imgFile,setImgFile] = useState<File|null>(null);
    const {
        toogglePermission,
        isPermissionOn,
        selectedPermissions
    } = usePermissionEditor({})
    const classes = {
        headerText:"text-lg font-bold text-gray-700",
        text:"text-lg text-gray-500",
        container:"grid grid-rows-maxmax w-full my-2",
        twoCols:"grid grid-cols-1fr1fr",
    }

    //form validation and submission logic
    const {mutate:requestAddUser,isLoading,data,error} = useMutation(addUser);
    const {register,formState:{errors},handleSubmit} = useForm<{fullName:string,email:string}>();
    const onSubmit=(data:{email:string,fullName:string})=>{
        requestAddUser({
            email:data.email,
            fullName:data.fullName,
            img:imgFile,
            previlages:selectedPermissions
        });
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
                iconEnd:<PlusIcon/>,
                disabled:isLoading,
                butonProps:{
                    form:"addUserForm"
                }
            }]}
            headerSection={
                <p className="text-xl font-bold text-indigo-700">Add User</p>
            }
        >
            <div className="w-full flex flex-col gap-2">
                <SingleImageUpload
                    img={userImage}
                    setImg={setUserImage}
                    setFile={setImgFile}
                />

                <form id="addUserForm" onSubmit={handleSubmit(onSubmit)}>
                    <LabledInput
                        inputProps={{...register("fullName",{required:{message:"Name is required",value:true}}),placeholder:"Full Name"}}
                        label="Full Name"
                        fullWidth
                        error={errors.fullName?.message}
                    />
                    <LabledInput
                        inputProps={{...register("email",{required:"Email is required"}),type:"email",placeholder:"Email"}}
                        label="Email"
                        fullWidth
                        error={errors.email?.message}
                    />
                </form>
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
import { TypeUser } from "../../TableComponents/user";
import { TypeIconButton } from "../../UIElements/IconButton";
import {BiSave as SaveIcon} from 'react-icons/bi'
import { useState } from "react";
import BaseModal from "../BaseModal";
import Divider from "../../UIElements/Divider";
import SingleImageUpload from "../../SingleImageUpload";
import LabledInput from "../../UIElements/LabledInput";
import {useEffect} from 'react';
import { allPermissions } from "../../../assets/permissions";
import ToggleChip from "../../UIElements/ToggleChip";
import usePermissionEditor from "../../../hooks/usePermissionEditor";
import baseURL from "../../../constants/BASE_URL";
import { useMutation } from "react-query";
import { changeUserStatus, TypeAddUser, updateUser } from "../../../services/UsersService";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { TypeCustomeErrorResponse, TypeMultiDataResponse } from "../../../types/types";


export interface TypeViewUserModal{
    user:TypeUser,
    onClose(event: void | React.MouseEvent<HTMLButtonElement>):void,
    changeUserStatus:({status,id}:{status:'Active'|'Suspended',id:string})=>void,
    isStatusChangeLoading:boolean
}
export default function ViewUserModal({user,onClose,changeUserStatus,isStatusChangeLoading}:TypeViewUserModal){
    const [userImg,setUserImg] = useState<string>(baseURL+user.img);
    const [imgFile,setImgFile] = useState<File|null>(null);
    //form validation logic
    const {mutate:requestUpdateUser,isLoading,data,error} = useMutation<TypeMultiDataResponse,TypeCustomeErrorResponse,{data:TypeAddUser,id:string}>(updateUser);
    const {
        register,
        formState:{errors},
        handleSubmit
    } = useForm<{fullName:string,email:string}>({
            defaultValues:{
                email:user.email,
                fullName:user.fullName
            }
    });
    //form submission logic
    const onSubmit=(data:{email:string,fullName:string})=>{
        requestUpdateUser({
            data:{
                email:data.email,
                fullName:data.fullName,
                img:imgFile,
                previlages:selectedPermissions
            },
            id:user.id
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

    //action buttons
    const actionButtons:TypeIconButton[] = [
        {
            type:"outline",
            children:"Save Changes",
            iconEnd:<SaveIcon/>,
            className:"w-36",
            color:"warning",
            disabled:isLoading,
            butonProps:{
                form:"updateUser"
            }
        }
    ];
    if(user.status==='Active'){
        actionButtons.push({
            type:"outline",
            children:"Suspend",
            color: "error",
            className:"w-24",
            onClick:()=>changeUserStatus({status:'Suspended',id:user.id}),
            disabled:isStatusChangeLoading
        });
    } else if(user.status==="Suspended"){
        actionButtons.push({
            type:"outline",
            children:"Activate",
            color: "success",
            className:"w-24",
            onClick:()=>changeUserStatus({status:'Active',id:user.id}),
            disabled:isStatusChangeLoading
        });
    }

    //permission editor
    const {
        toogglePermission,
        isPermissionOn,
        selectedPermissions
    } = usePermissionEditor({initialPermissions:user.previlages})


    //classes for the modal
    const classes = {
        headerText:"text-lg font-bold text-gray-700",
        text:"text-lg text-gray-500",
        container:"grid grid-rows-maxmax w-full my-2",
        twoCols:"grid grid-cols-1fr1fr",
    }
    
    const statusClass = (food:TypeUser)=>{
         if(food.status==="Suspended"){
            return "text-lg text-red-600"
        }
        else if(food.status==="Active"){
            return "text-lg text-green-600"
        }
    }
    return(
        <BaseModal
            headerSection={<p className='text-xl font-bold text-indigo-600'>{user.fullName}</p>}
            actions={actionButtons}
            onClose={onClose}
        >
            <div className='flex flex-col gap-2 w-full'>
                <div className={classes.twoCols}>
                    <div className={classes.container}>
                        <p className={classes.headerText}>ID</p>
                        <p className={classes.text}>{user.id}</p>
                    </div>
                    <div className={classes.container}>
                        <p className={classes.headerText}>Status</p>
                        <p className={statusClass(user)}>{user.status}</p>
                    </div>
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
                <Divider className='w-full my-4'/>
                <div className='w-full flex flex-col gap-3 pt-3'>
                    <SingleImageUpload
                        img={userImg}
                        setImg={setUserImg}
                        setFile={setImgFile}
                    />
                    <form id="updateUser" onSubmit={handleSubmit(onSubmit)}>
                        <LabledInput
                            inputProps={{...register('fullName',{required:"Full name is required"}), placeholder:"Full Name"}}
                            label="Full Name"
                            fullWidth
                            error={errors.fullName?.message}
                        />
                        <LabledInput
                            inputProps={{
                                ...register('email',{required:"Email is required"}), 
                                placeholder:"Email",
                            }}
                            label="Email"
                            fullWidth
                            error={errors.email?.message}
                        />
                    </form>
                </div>
            </div>
        </BaseModal>
    );
}
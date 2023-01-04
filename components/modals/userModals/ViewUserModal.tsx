import { TypeUser } from "../../TableComponents/user";
import { TypeIconButton } from "../../UIElements/IconButton";
import {BiSave as SaveIcon} from 'react-icons/bi'
import { useState } from "react";
import BaseModal from "../BaseModal";
import Divider from "../../UIElements/Divider";
import SingleImageUpload from "../../SingleImageUpload";
import LabledInput from "../../UIElements/LabledInput";
import LabledTextarea from "../../UIElements/LabledTextArea";
import { allPermissions, TypePermission } from "../../../assets/permissions";
import ToggleChip from "../../UIElements/ToggleChip";


export interface TypeViewUserModal{
    user:TypeUser,
    onClose(event: void | React.MouseEvent<HTMLButtonElement>):void
}
export default function ViewUserModal({user,onClose}:TypeViewUserModal){
    const actionButtons:TypeIconButton[] = [
        {
            type:"outline",
            children:"Save Changes",
            iconEnd:<SaveIcon/>,
            className:"w-36",
            color:"warning",
        }
    ];
    if(user.status==='Active'){
        actionButtons.push({
            type:"outline",
            children:"Suspend",
            color: "error",
            className:"w-24",
        });
    } else if(user.status==="Suspended"){
        actionButtons.push({
            type:"outline",
            children:"Activate",
            color: "success",
            className:"w-24",
        });
    }
    ////// Refactor this code/////////////////////////////////////////////////////
    const [selectedPermissions, setSelectedPermissions] = useState<TypePermission[]>(user.previlages);
    const tooglePermission = (permission:TypePermission)=>()=>{

        // if the permission already exists rmeove it
        if(selectedPermissions.includes(permission)){
            setSelectedPermissions((oldPermissions)=>{
                let newPermissions:TypePermission[] = [...oldPermissions];
                
                //get the index of permission
                const index:number = newPermissions.indexOf(permission);

                //remove the permission from the list
                newPermissions.splice(index,1);
                return newPermissions;
            })
        }
        // if the permission doesn't exist push it
        else{
            setSelectedPermissions((oldPermissions)=>{
                const newPermission = [...oldPermissions];
                newPermission.push(permission);
                return newPermission;
            })
        }
    }
    const isPermissionOn = (permission:TypePermission)=>{
        return selectedPermissions.includes(permission);
    }
    ////// Refactor this code/////////////////////////////////////////////////////


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
    const [userImg,setUserImg] = useState<string>(user.img);
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
                                onToggle={tooglePermission(permission)}
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
                    />
                    <LabledInput
                        inputProps={{name:"name", placeholder:"Full Name",value:user.fullName}}
                        label="Full Name"
                        fullWidth
                    />
                    <LabledInput
                        inputProps={{
                            name:"email", 
                            placeholder:"Email",
                            value:user.email,
                            type:"email",
                        }}
                        label="Email"
                        fullWidth
                    />
                </div>
            </div>
        </BaseModal>
    );
}
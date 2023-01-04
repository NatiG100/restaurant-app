import { TypeUser } from "../../TableComponents/user";
import { TypeIconButton } from "../../UIElements/IconButton";
import {BiSave as SaveIcon} from 'react-icons/bi'
import { useState } from "react";
import BaseModal from "../BaseModal";
import Divider from "../../UIElements/Divider";
import SingleImageUpload from "../../SingleImageUpload";
import LabledInput from "../../UIElements/LabledInput";
import LabledTextarea from "../../UIElements/LabledTextArea";


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
                <div className={classes.container}>
                    <p className={classes.headerText}>Previlages</p>
                    <div className="w-full flex flex-wrap gap-2 pt-3">
                        {user.previlages.map((previlage)=>(
                            <div key={previlage} className="
                                p-1
                                border-2 border-indigo-500 bg-indigo-300/20 text-indigo-500
                                rounded-full px-3 flex justify-center items-center font-semibold
                            ">
                                {previlage}
                            </div>
                        ))}
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
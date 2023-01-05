import { useState } from "react";
import { TypePermission } from "../assets/permissions";

export interface TypeUsePermissionEditor{
    initialPermissions?:TypePermission[]
}
export default function usePermissionEditor({initialPermissions=[]}:TypeUsePermissionEditor){
    ////// Refactor this code/////////////////////////////////////////////////////
    const [selectedPermissions, setSelectedPermissions] = useState<TypePermission[]>(initialPermissions);
    const toogglePermission = (permission:TypePermission)=>()=>{

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
    return {
        selectedPermissions,
        toogglePermission,
        isPermissionOn,
    }
}
import { TypePermission } from "../assets/permissions";
import instance from "./instance";

export const fetchAllUsers = async ()=>{
    return instance.get('/users')
}

interface TypeAddUser{
    email:string,
    fullName:string,
    img:File|null,
    previlages:TypePermission[]
}
export const addUser = async(data:TypeAddUser)=>{
    //create form data and append fields
    const formData = new FormData();
    formData.append("email",data.email);
    formData.append("fullName",data.fullName);
    data.previlages.forEach((previlage)=>{
        formData.append("previlages",previlage);
    })
    data.img&&formData.append("img",data.img,data.img.name);
    return instance.post('/users/register',formData,{
        headers:{
            "Content-Type": "multipart/form-data",
        }
    })
}

//update user service
export const updateUser = async({data,id}:{data:TypeAddUser,id:string})=>{
    //create form data and append fields
    const formData = new FormData();
    formData.append("email",data.email);
    formData.append("fullName",data.fullName);
    data.previlages.forEach((previlage)=>{
        formData.append("previlages",previlage);
    })
    data.img&&formData.append("img",data.img,data.img.name);
    return instance.patch(`/users/${id}/update`,formData,{
        headers:{
            "Content-Type": "multipart/form-data",
        }
    })
}
// export const login = async (data:{email:string,password:string})=>{
//     return instance.post(
//         'auth/login',
//         data,
//     );
// };
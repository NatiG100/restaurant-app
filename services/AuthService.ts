import axios from "axios"

export const login = async (data:{email:string,password:string})=>{
    return axios.post(
        'http://localhost:4000/api/auth/login',
        data,
        {withCredentials:true}
    ).then(data=>{
        return data?.data;
    })
    .catch((error)=>{
        return error?.response?.data;
    });
}
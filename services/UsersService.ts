import instance from "./instance";

export const fetchAllUsers = async ()=>{
    return instance.get('/users')
}

// export const login = async (data:{email:string,password:string})=>{
//     return instance.post(
//         'auth/login',
//         data,
//     );
// };
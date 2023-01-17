import instance from "./instance";

export const login = async (data:{email:string,password:string})=>{
    return instance.post(
        'auth/login',
        data,
    );
}

export const logout = async ()=>{
    return instance.post(
        'auth/logout'
    );
}
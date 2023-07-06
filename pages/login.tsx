import Image from "next/image";
import {useEffect} from 'react';
import { useForm } from "react-hook-form";

import {useMutation} from 'react-query';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import IconButton from "../components/UIElements/IconButton";
import LabledInput from "../components/UIElements/LabledInput";
import { login,logout } from "../services/AuthService";
import { TypeCustomeErrorResponse, TypeMultiDataResponse } from "../types/types";
import {login as dispatchLogin, logout as dispatchLogout} from './../Context/AuthSlice';
import logo from '../assets/svg/Logo.svg'
import loginBG from '../assets/img/login-bg.jpg'

export default function Login(){
    
    //form validation logic
    const {
        register,
        handleSubmit,
        formState:{errors}
    } = useForm<{password:string,email:string}>();
    const onLogin = (data:{email:string,password:string})=>{
        mutate(data)
    }

    
    // mutation for logging in
    const {
        data,
        error,
        isLoading,
        mutate
    }  = useMutation<TypeMultiDataResponse,TypeCustomeErrorResponse,{email:string,password:string}>(login,{retry:0});


    //dispatch and notification logic
    const dispatch = useDispatch();
    useEffect(()=>{
        if(error){
            toast(error?.message,{type:"error"})
        }
        if(data){
            dispatch(dispatchLogin(data?.data));
        }
    },[error,data]);

    return(
        <>
            <Image 
                    src={loginBG} 
                    alt="" 
                    height={1250}
                    width={1250}
                    className=" ml-auto mr-auto mb-3 h-screen w-screen object-cover fixed top-0 left-0"
                />
        <div className="w-full h-screen flex justify-center fixed top-0 left-0">
            <div className="
                w-full max-w-md rounded-lg p-5 px-1 
                h-max bg-[#111727] sm:p-12 sm:px-6 mt-16 sm:pt-5
                shadow-[15px_15px_50px_#341ac45a]
            ">
                <h1 className="
                    text-3xl text-white text-center font-medium
                ">
                <Image 
                    src={logo} 
                    alt="Logo" 
                    height={70}
                    width={70}
                    className="fill-transparent ml-auto mr-auto mb-3"
                />
                Restaurant Menu</h1>
                <p className="text-2xl text-gray-200 mt-5 font-[300]">Sign in</p>
                <form onSubmit={handleSubmit(onLogin)}>
                    <div className="my-5 mt-0 flex flex-col gap-0">
                        <LabledInput 
                            label={"Username"} 
                            fullWidth 
                            inputProps={{
                                placeholder:"Your email",
                                ...register("email",{required:{message:"email  is required",value:true}})
                            }}
                            error={errors.email?.message as string}
                        />
                        <LabledInput 
                            label={"Password"} 
                            fullWidth 
                            inputProps={{
                                placeholder:"Your password",
                                type:"password",
                                ...register("password",{required:{message:"password is required",value:true}})
                            }}
                            error={errors.password?.message as string}
                        />
                        <IconButton 
                            type="fill" 
                            className="mt-4 mx-0" 
                            disabled={isLoading}
                        >
                            Sing in
                        </IconButton>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
}
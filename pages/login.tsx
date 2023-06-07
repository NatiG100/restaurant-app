import Image from "next/image";
import {useEffect} from 'react';
import { useForm } from "react-hook-form";

import {useMutation} from 'react-query';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import logo from '../assets/svg/Logo.svg'
import IconButton from "../components/UIElements/IconButton";
import LabledInput from "../components/UIElements/LabledInput";
import { login,logout } from "../services/AuthService";
import { TypeCustomeErrorResponse, TypeMultiDataResponse } from "../types/types";
import {login as dispatchLogin, logout as dispatchLogout} from './../Context/AuthSlice';

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
    }  = useMutation<TypeMultiDataResponse,TypeCustomeErrorResponse,{email:string,password:string}>(login);


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
        <div className="w-full h-screen flex justify-center bg-gray-100">
            <div className="
                w-full max-w-md rounded-lg p-5 px-1 border 
                border-indigo-100 h-max bg-white sm:p-12 sm:px-6 mt-16 sm:pt-5
            ">
                {/* <img 
                    src={logo} 
                    alt="Logo" 
                    height={70}
                    width={70}
                    className="fill-transparent ml-auto mr-auto mb-3"
                /> */}
                <h1 className="
                    text-2xl text-indigo-700 text-center
                ">
                Restaurant Menu</h1>
                <p className="text-2xl text-gray-900 mt-5">Sign in</p>
                <form onSubmit={handleSubmit(onLogin)}>
                    <div className="my-5 flex flex-col gap-3">
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
    );
}
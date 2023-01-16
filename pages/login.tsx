import Image from "next/image";
import {useState,useEffect} from 'react';
import { useForm } from "react-hook-form";

import {useMutation} from 'react-query';

import logo from '../assets/svg/Logo.svg'
import IconButton from "../components/UIElements/IconButton";
import LabledInput from "../components/UIElements/LabledInput";
import { login } from "../services/AuthService";

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
    }  = useMutation(login);

    return(
        <div className="w-full h-screen flex justify-center items-center bg-white">
            <div className="
                w-full max-w-md rounded-lg p-5 shadow-xl border 
                border-indigo-50 h-max bg-white sm:p-12
            ">
                <Image 
                    src={logo} 
                    alt="Logo" 
                    height={70}
                    width={70}
                    className="fill-transparent ml-auto mr-auto mb-3"
                />
                <h1 className="
                    text-3xl font-bold text-indigo-700 text-center
                ">
                Login</h1>
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
                            type="outline" 
                            className="mt-4 mx-0" 
                            size="lg"
                            disabled={isLoading}
                        >
                            Login
                        </IconButton>
                    </div>
                </form>
            </div>
        </div>
    );
}
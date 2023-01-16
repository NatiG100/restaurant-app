import Image from "next/image";
import {useState,useEffect} from 'react';

import {useMutation} from 'react-query';

import logo from '../assets/svg/Logo.svg'
import IconButton from "../components/UIElements/IconButton";
import LabledInput from "../components/UIElements/LabledInput";
import { login } from "../services/AuthService";

export default function Login(){
    const [{email,password},setAuthInfo]= useState<{email:string,password:string}>({email:"",password:""});
    const onAuthInfoChange = (
        field:"email"|"password",
        event:React.ChangeEvent<HTMLInputElement>
    )=>{
        setAuthInfo((prevAuthInfo)=>{
            let newAuthInfo = {...prevAuthInfo};
            newAuthInfo[field] = event.target.value;
            return newAuthInfo;
        })
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
                w-full max-w-md rounded-lg p-12 shadow-xl border 
                border-indigo-50 h-max bg-white
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
                <div className="my-5 flex flex-col gap-3">
                    <LabledInput 
                        label={"Username"} 
                        fullWidth 
                        inputProps={{
                            name:"email",
                            placeholder:"Your email",
                            value:email,
                            onChange:(event)=>onAuthInfoChange("email",event)
                        }}
                    />
                    <LabledInput 
                        label={"Password"} 
                        fullWidth 
                        inputProps={{
                            name:"password", 
                            placeholder:"Your password",
                            type:"password",
                            value:password,
                            onChange:(event)=>onAuthInfoChange("password",event)
                        }}
                    />
                    <IconButton 
                        type="outline" 
                        className="mt-4 mx-0" 
                        size="lg"
                        onClick={()=>mutate({email,password})}
                    >
                        Login
                    </IconButton>
                </div>
            </div>
        </div>
    );
}
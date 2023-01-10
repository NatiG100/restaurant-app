import Image from "next/image";
import logo from '../assets/svg/Logo.svg'
import IconButton from "../components/UIElements/IconButton";
import LabledInput from "../components/UIElements/LabledInput";

export default function Login(){
    return(
        <div className="w-full h-full flex justify-center pt-12 bg-white">
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
                        inputProps={{name:"email",placeholder:"Your email"}}
                    />
                    <LabledInput 
                        label={"Password"} 
                        fullWidth 
                        inputProps={{name:"password", placeholder:"Your password",type:"password"}}
                    />
                    <IconButton type="outline" className="mt-4 mx-0" size="lg">Login</IconButton>
                </div>
            </div>
        </div>
    );
}
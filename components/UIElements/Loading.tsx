import Image from "next/image";
import Backdrop from "../Backdrop"
import loading from './../../assets/svg/Loading.svg';

export interface TypeLoading{
    type:"full"|"contained",
}
export default function Loading({type}:TypeLoading){
    if(type==="full"){
        return(
            <Backdrop type="white">
                <Image 
                    src={loading} 
                    alt="loading" 
                    className="fill-transparent h-10 w-10"
                />
            </Backdrop>
        );
    }
    return(
        <Image 
            src={loading} 
            alt="loading" 
            className="fill-transparent h-10 w-10"
        />
    );
}
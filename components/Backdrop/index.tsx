import ReactDOM from 'react-dom';
import {useEffect,useState} from 'react'
export interface TypeBackdrop{
    onClick?:()=>void,
    children:React.ReactNode,
}

export default function Backdrop({onClick=()=>{},children}:TypeBackdrop){
    let [backdrop,setBackdrop] = useState<HTMLElement|null>();
    useEffect(()=>{
        setBackdrop(document.getElementById("portal"));
    },[])
    if(!backdrop) return null;
    return ReactDOM.createPortal(
        <div 
            className={`
                w-screen h-screen fixed z-50  bg-black/70
                flex items-center justify-center    
            `}
            onClick={onClick}
        >
            {children}
        </div>,
        backdrop
    );
}
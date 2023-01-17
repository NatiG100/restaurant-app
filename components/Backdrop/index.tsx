import ReactDOM from 'react-dom';
import {useEffect,useState} from 'react'
export interface TypeBackdrop{
    onClick?:()=>void,
    children:React.ReactNode,
    type?:"dark"|"white"
}

export default function Backdrop({type="dark",onClick=()=>{},children}:TypeBackdrop){
    const [mounted, setMounted] = useState(false)

   useEffect(() => {
      setMounted(true)

      return () => setMounted(false)
   }, [])

   return mounted
      ? ReactDOM.createPortal(
        <div 
            className={`
                w-screen h-screen fixed z-50  ${type==="dark"?"bg-black/70":"bg-white/70"}
                flex items-center justify-center    
            `}
            onClick={onClick}
        >
            {children}
        </div>
        , 
        document.querySelector("#portal") as Element)
      : null
}
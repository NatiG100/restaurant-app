import IconButton, { TypeIconButton } from "../../UIElements/IconButton";
import {RiCloseFill as CloseIcon} from 'react-icons/ri'

export interface TypeBaseModal{
    children:React.ReactNode,
    headerSection: React.ReactNode,
    onClose?:()=>void,
    actions: TypeIconButton[]
}
export default function BaseModal ({children,headerSection,onClose=()=>{},actions}:TypeBaseModal){
    return(
        <div className={`
            bg-white border border-gray-100 shadow-lg rounded-lg
            w-full max-w-xl h-full max-h-192
            relative grid grid-rows-mx1frmx gap-6
            overflow-y-auto
        `} onClick={(event)=>{event.stopPropagation()}}>
            <div className={`
                flex items-center justify-between sticky top-0
                bg-white shadow-md shadow-white/70 px-8 py-3 z-20
            `}>
                {headerSection}
                <IconButton 
                    type="text" 
                    size="lg"
                    color="error"
                    iconStart={<CloseIcon size={25}/>} 
                    onClick={onClose}
                    className="rounded-full"
                >{""}</IconButton>
            </div>
            <div className="px-10 h-full">
                {children}
            </div>
            <div className={`
                sticky w-full bottom-0
                flex gap-4 justify-end items-center overflow-x-auto
                bg-white shadow-lg shadow-white/70 px-8 py-3
            `}>
                {actions.map((action,index)=>(
                    <IconButton {...action} key={index}/>
                ))}
            </div>
        </div>
    );
}
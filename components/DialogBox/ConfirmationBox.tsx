import DialogBox from ".";
import {useRef, useEffect} from 'react';

export interface ConfirmationBoxProps{
    callBack:(confirmed:boolean)=>void,
    title:string,
    prompt:string,
    color?: "primary"|"success"|"warning"|"error"|"default",
}

export default function(props:ConfirmationBoxProps){
    const buttonRef = useRef<HTMLButtonElement>(null);
    useEffect(()=>{
        if(buttonRef){
            buttonRef.current?.focus();
        }
    },[buttonRef]);
    return(
        <DialogBox
            title={props.title}
            body={<p>{props.prompt}</p>}
            color={props.color}
            actions={[
                {
                    children:"Yes",
                    type:"fill",
                    color:"error",
                    onClick:()=>{props.callBack(true)},
                    className:"w-24"
                },
                {
                    children:"No",
                    type:"outline",
                    color:"warning",
                    onClick:()=>{props.callBack(false)},
                    className:"w-24",
                    buttonProps:{ref:buttonRef}
                }
            ]}
        />
    )
}
import { TypeButton } from "../UIElements/Button";
import IconButton from '../UIElements/IconButton';

export interface DialogBoxProps{
    title:string,
    body:React.ReactNode,
    actions:TypeButton[],
    actionClassName?:string,
    titleClassName?:string,
    className?:string,
    color?: "primary"|"success"|"warning"|"error"|"default",
}

export default function DialogBox(props:DialogBoxProps){
    return (
        <div className={`grid grid-cols-3 p-4 rounded-lg ${props.className}`}>
            <p>{props.title}</p>
            <div className="w-full h-max">{props.body}</div>
            <div className={`flex gap-2 items-center justify-end py-2 ${props.actionClassName}`}>
                {
                    props.actions.map((action)=>(
                        <IconButton {...action}/>
                    ))
                }
            </div>
        </div>
    )
}
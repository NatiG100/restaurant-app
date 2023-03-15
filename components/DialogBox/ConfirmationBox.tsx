import DialogBox from ".";

export interface ConfirmationBoxProps{
    callBack:(confirmed:boolean)=>void,
    title:string,
    prompt:string,
}

export default function(props:ConfirmationBoxProps){
    return(
        <DialogBox
            title={props.title}
            body={<p>{props.prompt}</p>}
            actions={[
                {
                    children:"Yes",
                    type:"fill",
                    color:"error",
                    onClick:()=>{props.callBack(true)}
                },
                {
                    children:"No",
                    type:"outline",
                    color:"warning",
                    onClick:()=>{props.callBack(true)}
                }
            ]}
        />
    )
}
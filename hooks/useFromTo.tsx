import React, { useState } from "react";

export default function useFromTo(){
    const [from,setFrom] = useState<Date>(new Date());
    const [to,setTo] = useState<Date>(new Date());
    const [error,setError] = useState<string|null>(null);
    
    const onFromChange = (event: React.ChangeEvent<HTMLDataElement>)=>{
        const newFromDate = new Date(event.target.value);
        if(newFromDate<=to){
            setFrom(newFromDate);
        }else{
            setError("From should be before to.")
        }
    }
    const onToChange = (event: React.ChangeEvent<HTMLDataElement>)=>{
        const newToDate = new Date(event.target.value);
        if(newToDate>=from){
            setTo(newToDate);
        }else{
            setError("To should be after from.")
        }
    }
    [
        from,
        to,
        onFromChange,
        onToChange,
    ]
}
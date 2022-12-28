import React, { ChangeEvent, useCallback, useState } from "react";
import { formatDate } from "../utils/date";

export default function useFromTo(){
    const [from,setFrom] = useState<string>(formatDate(new Date(Date.now())));
    const [to,setTo] = useState<string>(formatDate(new Date(Date.now())));
    const [error,setError] = useState<string|null>(null);
    
    const onFromChange = useCallback((event: ChangeEvent<HTMLDataElement>)=>{
        const newFromDate = event.target.value;
        if(newFromDate>to){
            setError("From should be before to.")
        }
        else if(formatDate(new Date(Date.now()))<newFromDate){
            setError("From can't be after today.")
        }
        else{
            setFrom(newFromDate);
            setError(null);
        }
    },[to])
    const onToChange = useCallback((event: ChangeEvent<HTMLDataElement>)=>{
        const newToDate = event.target.value;
        if(newToDate<from){
            setError("To should be after from.")
        }
        else if(formatDate(new Date(Date.now()))<newToDate){
            setError("To can't be after today.")
        }
        else{
            setTo(newToDate);
            setError(null);
        }
    },[from])
    return {
        from,
        to,
        error,
        onFromChange,
        onToChange,
    }
}
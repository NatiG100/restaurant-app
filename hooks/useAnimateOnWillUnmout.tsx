import {useState,useCallback,useEffect} from 'react';
export default function(initial:boolean){
    const [show,setShow] = useState(initial);
    const [shouldRender,setShouldRender] = useState(initial);
    const triggerRender = useCallback(()=>{
        setShow(true);
    },[]);
    const triggerRemove = useCallback(()=>{
        setShow(false);
    },[]);
    useEffect(()=>{
        if(show){
            setShouldRender(true);
        }
    },[show]);
    const onAnimationEnd = useCallback(()=>{
        if(!show){
            setShouldRender(false);
        }
    },[show]);

    return{
        show,
        shouldRender,
        triggerRender,
        triggerRemove,
        onAnimationEnd,
    }
}
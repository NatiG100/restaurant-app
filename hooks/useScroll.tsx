import { useCallback, useEffect, useState } from "react";

const useScroll = ({ref,amount=100}:{ref:React.RefObject<HTMLElement>,amount:number})=>{
    const [start,setStart] = useState(false);
    const [end,setEnd] = useState(false);
    const updateSliderState=useCallback(()=>{
        if(ref.current){
            if(Math.round(ref.current.scrollLeft)!==ref.current.scrollWidth-ref.current.clientWidth&&ref.current.scrollLeft===0){
                setStart(true);
                setEnd(false);
            }else if(Math.round(ref.current.scrollLeft)===ref.current.scrollWidth-ref.current.clientWidth&&ref.current.scrollLeft!==0){
                setEnd(true);
                setStart(false);
            }else if(Math.round(ref.current.scrollLeft)===ref.current.scrollWidth-ref.current.clientWidth&&ref.current.scrollLeft===0){
                setEnd(true);
                setStart(true);
            }else{
                setEnd(false);
                setStart(false);
            }
        }
    },[ref]);
    
    const listenForScrollChange = useCallback(()=>{
        updateSliderState();
    },[updateSliderState])
    useEffect(()=>{
        if(ref.current){
            ref.current.addEventListener('scroll',listenForScrollChange);
            window.addEventListener('resize',listenForScrollChange);
            updateSliderState();
        }
    },[updateSliderState,listenForScrollChange,ref])
    function moveRight(){
        if(ref.current){
            ref.current.scrollLeft -= amount;
            updateSliderState();
        }
    }
    function moveLeft(){
        if(ref.current){
            ref.current.scrollLeft += amount;
            updateSliderState();
        }
    }
    return{
        start,
        end,
        moveLeft,
        moveRight,
    }
}
export default useScroll;
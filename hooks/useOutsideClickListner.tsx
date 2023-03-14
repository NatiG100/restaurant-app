import { useState, useEffect, MouseEventHandler } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
export function useOutsideClickListner(
        ref:React.RefObject<HTMLElement>,
        exceptionElements:React.RefObject<HTMLElement>[]=[],
        initial=true
    ) {
    const [clickedOutside, setClickedOutside] = useState(initial);
    useEffect(() => {
        function handleClickOutside(event:any) {
            if (ref.current && !ref.current.contains(event.target)) {
                setClickedOutside(true);
            }
            else{  
                let exceptionElementClicked = false;
                exceptionElements.forEach((exceptionElement)=>{
                    if(event.target===exceptionElement.current){
                        exceptionElementClicked = true;
                    }
                });
                if(exceptionElementClicked){
                    setClickedOutside((prev)=>(!prev));
                }else{
                    setClickedOutside(false);
                }
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
    return clickedOutside;
}
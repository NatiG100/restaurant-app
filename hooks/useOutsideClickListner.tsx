import { useState, useEffect, MouseEventHandler } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
export function useOutsideClickListner(ref:React.RefObject<HTMLElement>) {
    const [clickedOutside, setClickedOutside] = useState(false);
    useEffect(() => {
        function handleClickOutside(event:any) {
            if (ref.current && !ref.current.contains(event.target)) {
                setClickedOutside(true);
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
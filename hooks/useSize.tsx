interface size{
    height: number,
    width: number,
}
function getSize(element:HTMLElement|null){
    let dimension:size = {height:0,width:0};
    dimension.width = element?.clientWidth || 0;
    dimension.height  = (element?.clientHeight || 0)/1.2;
    return dimension;
}
import React from 'react';
export default function useSize(element:HTMLElement|null){
    const [size,setSize] = React.useState<size>(getSize(element));

    React.useEffect(()=>{
        setSize(getSize(element))
        const onResize = ()=>{
            setSize(getSize(element))
            console.log(getSize(element));
        };
        window.addEventListener('resize',onResize);
        return () => {window.removeEventListener('resize', onResize)}
        
    },[element]);

    return size;
}
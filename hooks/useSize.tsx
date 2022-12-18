interface size{
    height: number,
    width: number,
}
function getSize(element:HTMLElement|null){
    let dimension:size = {height:0,width:0};
    dimension.width = element?.offsetWidth || 0;
    dimension.height  = element?.offsetWidth || 0;
    return dimension;
}
import React from 'react';
export default function useSize(element:HTMLElement|null){
    const [size,setSize] = React.useState<size>(getSize(element));

    React.useEffect(()=>{
        const onResize = ()=>setSize(getSize(element));
        window.addEventListener('resize',onResize);
        return () => window.removeEventListener('resize', onResize)
    },[element]);

    return size;
}
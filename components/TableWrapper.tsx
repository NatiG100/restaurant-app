import React from 'react'
export default function TableWrapper({children}:{children:React.ReactNode}){
    return(
        <div className="h-full w-full p-12 overflow-auto">
            {children}
        </div>
    );
}
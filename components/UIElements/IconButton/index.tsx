import React from 'react';
import { IconType } from 'react-icons/lib';
export interface TypeButton{
    children: string,
    size?:"sm"|"md"|"lg",
    type?: "outline"|"fill"|"text",
    color?: "primary"|"success"|"warning",
    className?:string,
    iconStart?:React.ReactNode,
    iconEnd?:React.ReactNode,
    disabled?:boolean,
    onClick?:()=>void,
}

export default function IconButton({
    children,
    size="md",
    type="fill",
    color="primary",
    className,
    iconStart,
    iconEnd,
    disabled=false,
    onClick=()=>{}
}: TypeButton){
    return (
        <button 
            className={`
                ${disabled&&"opacity-70"} ${disabled&&"pointer-events-none"}
                flex gap-2 items-center justify-center
                rounded-lg transition-all ${className}
                 m-1 py-2
                ${size==="sm"?"text-xs p-1":size==="lg"&&"text-lg p-2"}
                ${
                    type==="outline"?`border 
                        ${
                            color==="primary"?"border-indigo-700 bg-indigo-700/10 text-indigo-700 hover:bg-indigo-700/20 hover:text-indigo-800":
                            color==="warning"?"border-yellow-700 bg-yellow-700/10 text-yellow-700 hover:bg-yellow-700/20 hover:text-yellow-800":
                            "border-green-700 bg-green-700/10 text-green-700 hover:bg-green-700/20 hover:text-green-800"
                        }
                    `:type==="fill"?`
                        ${
                            color==="primary"?`bg-indigo-500 text-indigo-50 hover:bg-indigo-700 hover:text-indigo-50`:
                            color==="warning"?"bg-yellow-500 text-yellow-50 hover:bg-yellow-700 hover:text-yellow-50":
                            "bg-green-800 text-green-50 hover:bg-green-700 hover:text-green-50"
                        }
                    `:`bg-transparent
                        ${
                            color==="primary"?"text-indigo-700 hover:bg-indigo-700/20":
                            color==="warning"?"text-yellow-700 hover:bg-yellow-700/20":
                            "text-green-700 hover:bg-green-700/20"
                        }
                    `
                }
            `}
            onClick={onClick}
        >
            <>
                {iconStart}
                {children}
                {iconEnd}
            </>
        </button>
    );
}
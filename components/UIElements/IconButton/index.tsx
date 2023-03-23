import React from 'react';
export interface TypeIconButton{
    children: string,
    size?:"sm"|"smd"|"md"|"lg",
    type?: "outline"|"fill"|"text",
    color?: "primary"|"success"|"warning"|"error"|"default",
    className?:string,
    iconStart?:React.ReactNode,
    iconEnd?:React.ReactNode,
    disabled?:boolean,
    onClick?:()=>void,
    buttonProps?:React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>,HTMLButtonElement>
}

const IconButton =  React.forwardRef(({
        children,
        size="md",
        type="fill",
        color="primary",
        className,
        iconStart,
        iconEnd,
        disabled=false,
        onClick=()=>{},
        buttonProps={}
    }: TypeIconButton,ref:React.LegacyRef<HTMLButtonElement>)=>{
    return (
        <button 
            {...buttonProps}
            ref={ref}
            className={`
                focus:shadow-md
                ${disabled&&"opacity-70"} ${disabled&&"pointer-events-none"}
                flex gap-2 items-center justify-center
                rounded-md transition-all ${className}
                 m-1 py-2 
                ${size==="sm"?"text-xs p-1":size==="smd"?"text-sm p-2":size==="lg"&&"text-lg p-2"}
                ${
                    type==="outline"?`border 
                        ${
                            color==="primary"?"border-indigo-700 bg-indigo-700/10 text-indigo-700 hover:bg-indigo-700/20 hover:text-indigo-800":
                            color==="warning"?"border-yellow-700 bg-yellow-700/10 text-yellow-700 hover:bg-yellow-700/20 hover:text-yellow-800":
                            color==="error"?"border-red-700 bg-red-700/10 text-red-700 hover:bg-red-700/20 hover:text-red-800":
                            color==="success"?"border-green-700 bg-green-700/10 text-green-700 hover:bg-green-700/20 hover:text-green-800":
                                "border-gray-700 bg-gray-700/10 text-gray-700 hover:bg-gray-700/20 hover:text-gray-800"
                        }
                    `:type==="fill"?`
                        ${
                            color==="primary"?`bg-indigo-500 text-indigo-50 hover:bg-indigo-700 hover:text-indigo-50`:
                            color==="warning"?"bg-yellow-600 text-yellow-50 hover:bg-yellow-700 hover:text-yellow-50":
                            color==="error"?"bg-red-500 text-red-50 hover:bg-red-700 hover:text-red-50":
                            color==="success"?"bg-green-800 text-green-50 hover:bg-green-700 hover:text-green-50":
                                "bg-gray-800 text-gray-50 hover:bg-gray-700 hover:text-gray-50"
                        }
                    `:`bg-transparent
                        ${
                            color==="primary"?"text-indigo-700 hover:bg-indigo-700/20":
                            color==="warning"?"text-yellow-700 hover:bg-yellow-700/20":
                            color==="error"?"text-red-700 hover:bg-red-700/20":
                            color==="success"?"text-green-700 hover:bg-green-700/20":
                                "text-gray-700 hover:bg-gray-700/20"
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
});

export default IconButton;
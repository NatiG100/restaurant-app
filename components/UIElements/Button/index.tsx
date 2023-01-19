export interface TypeButton{
    children: string,
    size?:"sm"|"md"|"lg",
    type?: "outline"|"fill"|"text",
    color?: "primary"|"success"|"warning"|"error",
    className?:string,
    onClick?(event: void | React.MouseEvent<HTMLButtonElement>):void,
    disabled?:boolean
}

export default function Button({
    children,
    size="md",
    type="fill",
    color="primary",
    className,
    onClick=()=>{},
    disabled=false
}: TypeButton){
    return (
        <button 
            disabled={disabled}
            className={`
                opacity-100
                disabled:opacity-60
                rounded-lg transition-all ${className}
                m-1
                ${size==="sm"?"text-xs p-1":size==="lg"&&"text-lg p-2"}
                ${
                    type==="outline"?`border 
                        ${
                            color==="primary"?"border-indigo-700 bg-indigo-700/10 text-indigo-700 hover:bg-indigo-700/20 hover:text-indigo-800":
                            color==="warning"?"border-yellow-700 bg-yellow-700/10 text-yellow-700 hover:bg-yellow-700/20 hover:text-yellow-800":
                            color==="error"?"border-red-700 bg-red-700/10 text-red-700 hover:bg-red-700/20 hover:text-red-800":
                            "border-green-700 bg-green-700/10 text-green-700 hover:bg-green-700/20 hover:text-green-800"
                        }
                    `:type==="fill"?`
                        ${
                            color==="primary"?"bg-indigo-500 text-indigo-50 hover:bg-indigo-700 hover:text-indigo-50":
                            color==="warning"?"bg-yellow-600 text-yellow-50 hover:bg-yellow-500 hover:text-yellow-50":
                            color==="error"?"bg-red-500 text-red-50 hover:bg-red-700 hover:text-red-50":
                            "bg-green-500 text-green-50 hover:bg-green-700 hover:text-green-50"
                        }
                    `:`bg-transparent
                        ${
                            color==="primary"?"text-indigo-700 hover:bg-indigo-700/20":
                            color==="warning"?"text-yellow-700 hover:bg-yellow-700/20":
                            color==="error"?"text-red-700 hover:bg-red-700/20":
                            "text-green-700 hover:bg-green-700/20"
                        }
                    `
                }
            `}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
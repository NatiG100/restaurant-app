import { Md10K } from "react-icons/md";


export interface TypeButton{
    children: string,
    size?:"sm"|"md"|"lg",
    type?: "outline"|"fill"|"text",
    color?: "primary"|"success"|"warning",
    className?:string,
    onClick?:()=>void,
}

export default function Button({
    children,
    size="md",
    type="fill",
    color="primary",
    className,
    onClick=()=>{}
}: TypeButton){
    return (
        <button 
            className={`
                rounded-lg transition-all ${className}
                 m-1
                ${size==="sm"?"text-xs p-1":size==="lg"&&"text-lg p-2"}
                ${
                    type==="outline"?`border 
                        ${
                            color==="primary"?"border-indigo-700 bg-indigo-700/10 text-indigo-700 hover:bg-indigo-700 hover:text-indigo-50":
                            color==="warning"?"border-yellow-700 bg-yellow-700/10 text-yellow-700 hover:bg-yellow-700 hover:text-yellow-50":
                            "border-green-700 bg-green-700/10 text-green-700 hover:bg-green-700 hover:text-green-50"
                        }
                    `:type==="fill"?`
                        ${
                            color==="primary"?"bg-indigo-500 text-indigo-50 hover:bg-indigo-700 hover:text-indigo-50":
                            color==="warning"?"bg-yellow-500 text-yellow-50 hover:bg-yellow-700 hover:text-yellow-50":
                            "bg-green-500 text-green-50 hover:bg-green-700 hover:text-green-50"
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
            {children}
        </button>
    );
}
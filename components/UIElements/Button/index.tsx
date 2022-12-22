import { Md10K } from "react-icons/md";

export enum buttonSize {
    sm,
    md,
    lg,
}

export enum buttonType{
    outline,
    text,
    fill
}

export interface TypeButton{
    children: string,
    size?: buttonSize,
    type?: buttonType,
    color?: string,
    className?:string,
    onClick?:()=>void,
}

export default function Button({
    children,
    size=buttonSize.md,
    type=buttonType.fill,
    color="indigo",
    className,
    onClick=()=>{}
}: TypeButton){
    return (
        <button 
            className={`
                rounded-lg transition-all ${className}
                 m-1
                ${size===buttonSize.sm?"text-xs p-1":size===buttonSize.lg&&"text-lg p-2"}
                ${
                    type===buttonType.outline?`
                        border border-${color}-700 bg-${color}-50 
                        text-${color}-700 hover:bg-${color}-700 hover:text-${color}-50
                    `:type===buttonType.fill?`
                        text-${color}-50 bg-${color}-500
                        hover:text-${color}-700 hover:bg-${color}-700 hover:text-${color}-50
                    `:`
                        bg-transparent text-${color}-700 hover:bg-${color}-700/20
                    `
                }
            `}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
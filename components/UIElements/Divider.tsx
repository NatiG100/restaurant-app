export interface TypeDivider{
    orientation?:"v"|"h",
    theme?:'light'|'dark',
    className?:string,
}
export default function Divider({orientation="h",theme='light',className=""}:TypeDivider){
    return(
        <div className={`
            border
            ${orientation==='h'?"w-full":"h-full"} 
            ${theme==='dark'?"border-white/10":"border-black/10"}
            ${className}
        `}>

        </div>
    );
}
export interface TypeDivider{
    orientation?:"v"|"h",
    theme?:'light'|'dark',
}
export default function Divider({orientation="h",theme='light'}:TypeDivider){
    return(
        <div className={`
            border
            ${orientation==='h'?"w-full":"h-full"} 
            ${theme==='dark'?"border-white/25":"border-black/25"}
        `}>

        </div>
    );
}
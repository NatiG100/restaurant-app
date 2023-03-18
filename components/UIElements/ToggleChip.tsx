export interface TypeToggleChip{
    onToggle:()=>void,
    on:boolean,
    children:string,
    disabled?:boolean,
}
export default function ToggleChip({
    onToggle,
    on,
    children,
    disabled=false,
}:TypeToggleChip){

    const handleClick = ()=>{
        if(!disabled){
            onToggle();
        }
    }
    const colorClass= on?
    "text-indigo-600 border-indigo-600 bg-indigo-700/20":
    "text-gray-500 border-gray-500 bg-gray-700/10";
    return(
        <div 
            className={`
                ${colorClass} border rounded-full p-3 py-1
                h-max cursor-pointer transition-all
                hover:shadow-md
            `}
            title={on?`Deselect ${children}`:`Select ${children}`}
            onClick={handleClick}
        >
            <p className="">{children}</p>
        </div>
    );
}
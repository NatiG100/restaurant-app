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
                ${colorClass} border-2 rounded-full p-2 px-3
                h-max cursor-pointer transition-all
                hover:shadow-md
            `}
            title={on?`Deselect ${children}`:`Select ${children}`}
            onClick={handleClick}
        >
            <p className="text-lg">{children}</p>
        </div>
    );
}
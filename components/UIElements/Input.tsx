export default function Input(props:React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>,HTMLInputElement>){
    return(
        <input
            className="
                border border-gray-400 bg-gray-100 text-indigo-500
                focus:border-indigo-400 focus:text-indigo-700
                font-semibold h-max p-2 rounded
            " 
            {...props} 
        />
    );
}
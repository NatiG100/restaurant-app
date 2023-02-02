export interface TypeLabledTextarea{
    inputProps: React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>,HTMLTextAreaElement>,
    label:String,
    error?:string,
    fullWidth?:boolean,
}

export default function LabledTextarea({inputProps,label,error,fullWidth=false}:TypeLabledTextarea){
    return(
        <div className={`${fullWidth&&"w-full"} flex flex-col gap-1 ${inputProps.disabled&&"opacity-70"}`}>
            <label htmlFor={inputProps.name} className="text-md text-gray-900">{label}</label>
            <textarea
                className={`
                    border bg-gray-100 
                    ${
                        error?"text-red-500 border-red-400 focus:border-red-400 focus:text-red-700 focus:ring-red-500":
                        "text-gray-600 border-gray-400 focus:border-indigo-400 focus:text-gray-800"
                    }
                    ${inputProps.disabled&&"opacity-70"}
                    font-semibold h-max p-2 rounded ${fullWidth&&"w-full"}
                 `}
                {...inputProps}
            />
            {error&&<p className={`text-red-600 ${inputProps.disabled&&"opacity-70"}`}>{error}</p>}

        </div>
    );
}
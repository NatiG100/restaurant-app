export interface TypeLabledInput{
    inputProps: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>,HTMLInputElement>,
    label:String,
    error?:string,
    fullWidth?:boolean,
}

export default function LabledInput({inputProps,label,error,fullWidth=false}:TypeLabledInput){
    return(
        <div className={`${fullWidth&&"w-full"} flex flex-col gap-1`}>
            <label htmlFor={inputProps.name}>{label}</label>
            <input
                className={`
                    border border-gray-400 bg-gray-100 
                    ${
                        error?"text-red-500 focus:border-red-400 focus:text-red-700":
                        "text-indigo-500 focus:border-indigo-400 focus:text-indigo-700"
                    } 
                    font-semibold h-max p-2 rounded ${fullWidth&&"w-full"}
                 `}
                {...inputProps}
            />
            {error&&<p>{error}</p>}

        </div>
    );
}
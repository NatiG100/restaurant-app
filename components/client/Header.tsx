export default function Header({children}:{children:React.ReactNode}){
    return(
        <div 
            className="
                bg-gray-200 rounded-b-xl flex items-center w-full
                h-20 px-4 sticky top-0 left-0"
        >
            <div className="w-max max-w">
                {children}
            </div>
        </div>
    );
}
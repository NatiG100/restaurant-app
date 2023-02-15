export default function Header({children}:{children:React.ReactNode}){
    return(
        <div 
            className="
                bg-gray-200 rounded-b-2xl flex items-center w-full
                h-16 px-4 sticky top-0 left-0 z-40 shadow-lg shadow-white"
        >
            <div className="w-max max-w">
                {children}
            </div>
        </div>
    );
}
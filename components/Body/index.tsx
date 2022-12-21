interface BodyInterface {
    title: string,
    children: React.ReactNode,
    className?: string
}
export default function Body({title, children, className} : BodyInterface){
    return(
        <div className={` grid grid-rows-mx1fr w-full p-8 h-full overflow-auto text-indigo-800 ${className}`}>
            <p className="text-2xl font-semibold mb-10">{title}</p>
            <div className="w-full h-full">
                {children}
            </div>
        </div>
    );
}
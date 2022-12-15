interface BodyInterface {
    title: string,
    children: React.ReactNode,
}
export default function Body({title, children} : BodyInterface){
    return(
        <div className=" grid grid-rows-maxmax w-full p-8 h-full overflow-auto text-indigo-800">
            <p className="text-2xl font-semibold">{title}</p>
            <div className="w-full">
                {children}
            </div>
        </div>
    );
}
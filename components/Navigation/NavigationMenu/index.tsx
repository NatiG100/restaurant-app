import Link from "next/link";

interface NavigationMenuInterface {
    children: React.ReactNode,
    route: string,
    selected: boolean,
}

export default function NavigationMenu ({children,route,selected}:NavigationMenuInterface){
    return(
        <Link 
            href="/"
            className={`w-full ${selected?"bg-indigo-200 text-indigo-700":"bg-indigo-100 text-indigo-500"} 
                hover:bg-indigo-200 px-3 py-2 rounded-md transition-all font-semibold
                flex gap-3 items-center justify-start`}
        >
            {children}
        </Link>
    );
}
import Link from "next/link";
import { useRouter } from "next/router";

interface NavigationMenuInterface {
    children: React.ReactNode,
    route: string,
    only?:boolean,
    defaultRoute?:string,
}

export default function NavigationMenu ({children,route,only=false,defaultRoute=""}:NavigationMenuInterface){
    const router = useRouter();
    let selected = router.pathname === route;
    if(!only){
        selected = router.pathname.includes(route);
    }
    return(
        <Link 
            href={route+defaultRoute}
            className={`
                w-full ${selected?"bg-indigo-300 text-indigo-800":"bg-indigo-100 text-indigo-500"} 
                hover:bg-indigo-200 px-3 py-2 rounded-md transition-all font-semibold
                flex gap-3 items-center justify-start ring-0 focus:ring-2 focus:outline-0 ring-indigo-500
            `}
        >
            {children}
        </Link>
    );
}
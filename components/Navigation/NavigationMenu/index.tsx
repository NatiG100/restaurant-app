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
                w-full ${selected?"bg-[#343b48]":""} 
                hover:bg-[#0005] px-5 py-[10px]  transition-all font-[500]
                flex gap-3 items-center justify-start ring-0  focus:outline-0 ring-[#0005]
                text-white drop-shadow-xl text-[17px] duration-200
            `}
        >
            {children}
        </Link>
    );
}
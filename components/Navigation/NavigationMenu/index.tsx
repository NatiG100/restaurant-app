import Link from "next/link";
import { useRouter } from "next/router";

interface NavigationMenuInterface {
    children: React.ReactNode,
    route: string,
}

export default function NavigationMenu ({children,route}:NavigationMenuInterface){
    const router = useRouter();
    const selected = router.pathname === route;
    return(
        <Link 
            href={route}
            className={`w-full ${selected?"bg-indigo-300 text-indigo-800":"bg-indigo-100 text-indigo-500"} 
                hover:bg-indigo-200 px-3 py-2 rounded-md transition-all font-semibold
                flex gap-3 items-center justify-start`}
        >
            {children}
        </Link>
    );
}
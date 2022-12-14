import { ReactElement } from "react";

interface AppbarInterface {
    component?: ReactElement,
}

export default function Appbar({component} : AppbarInterface){
    return(
        <div className="h-16 py-2 bg-white w-full border-b border-slate-300 flex justify-between items-center px-8">
            {component}
            <p>Menu</p>
        </div>
    );
}
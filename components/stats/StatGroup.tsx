import Divider from "../UIElements/Divider";
import StatItem, { TypeStatItem } from "./StatItem";

export interface TypeStatItemGroup{
    title:string,
    stats:TypeStatItem[],
}
export default function StatGroup (props:TypeStatItemGroup){
    return(
        <div className="flex flex-col gap-1 w-full max-w-xs">
            <p className="text-indigo-700 font-bold text-xl my-2">
                {props.title}
            </p>
            <Divider className="mb-4"/>
            {
                props.stats.map((stat)=>(
                    <StatItem {...stat} key={stat.title}/>
                ))
            }
        </div>
    );
}
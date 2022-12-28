import Divider from "../UIElements/Divider";
import StatItem, { TypeStatItem } from "./StatItem";

export interface TypeStatItemGroup{
    title:string,
    stats:TypeStatItem[],
}
export default function StatGroup (props:TypeStatItemGroup){
    return(
        <div className="flex flex-col gap-1 w-full">
            <p>{props.title}</p>
            <Divider/>
            {
                props.stats.map((stat)=>(
                    <StatItem {...stat}/>
                ))
            }
        </div>
    );
}
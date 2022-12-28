export interface TypeStatItem{
    title:string,
    value:number,
    multiplier?:"K"|"M"|"B"|"",
    fixTo?:number,
    postfix?:string,
}
export default function StatItem ({fixTo=0,title,value,multiplier="",postfix=""}:TypeStatItem){
    const divider = multiplier==="K"?1000:
                    multiplier==="M"?1000000:
                    multiplier==="B"?1000000000:1;
    return(
        <div className="flex flex-col gap-1 pr-2">
            <p className="text-gray-700 font-bold text-lg">{title}</p>
            <div className="w-full px-2 py-2 flex items-center justify-start bg-gray-200 rounded-sm">
                <p className="text-gray-700  text-lg">{(value/divider).toFixed(fixTo)+multiplier+" "+postfix}</p>
            </div>
        </div>
    );
}
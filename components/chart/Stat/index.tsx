export const enum notation {
    K = 1000,
    M = 1000000,
    B = 10000000000,
    none,
}
interface statInterface {
    title:string,
    delta: number,
    icon: React.ReactNode,
    value: number,
    postfix: string,
    precision: number,
    notation:notation
}

export default function Stat (props:statInterface) {
    return(
        <div className="bg-white relative flex p-12 rounded-full w-64 shadow-md shadow-black">
            <div className="bg-indigo-700 p-6 rounded-full h-max w-max">
                {props.icon}
            </div>
            <div className="grid grid-rows-2">
                <p className="text-lg text-indigo-400">{props.title}</p>
                <p className="text-2xl text-orange-600">
                    {(props.value/props.notation).toPrecision(props.precision)}
                    {props.notation===notation.K?"K":props.notation===notation.M?"M":props.notation===notation.B?"M":""}
                     {props.postfix}
                </p>
            </div>
            <p className={`text-base absolute t-8 r-8 ${props.delta<0?"text-red-600":"text-green-600"}`}>
                {props.delta<0?-1*props.delta:props.delta}
            </p>
        </div>
    );
}
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
        <div className="bg-white relative flex gap-4 p-6 rounded-full w-80 shadow-custom-lg">
            <div className="bg-indigo-700 p-2 rounded-full h-max w-max">
                {props.icon}
            </div>
            <div className="flex flex-col items-center">
                <p className="text-lg text-gray-700 font-semibold">{props.title}</p>
                <p className="text-2xl text-yellow-600 font-bold">
                    {(props.value/props.notation).toFixed(props.precision)}
                    {props.notation===notation.K?"K":props.notation===notation.M?"M":props.notation===notation.B?"M":""}
                     {" " + props.postfix}
                </p>
            </div>
            <p className={`text-base absolute top-4 right-6 ${props.delta<0?"text-red-600":"text-green-600"}`}>

                {props.delta<0?-1*props.delta:props.delta}%
            </p>
        </div>
    );
}
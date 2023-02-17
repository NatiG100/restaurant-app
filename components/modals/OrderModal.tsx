import Image from "next/image";
import baseURL from "../../constants/BASE_URL";
import useTimeCounter from "../../hooks/useTimeCounter";
import { TypeItem, TypeOrder } from "../TableComponents/order";
import { TypeButton } from "../UIElements/Button";
import BaseModal from "./BaseModal";

export interface TypeOrderModal{
    order:TypeOrder,
    onClose?:()=>void,
}

const classes = {
    headerText:"text-lg font-bold text-gray-700",
    text:"text-lg text-gray-500",
    container:"grid grid-rows-maxmax w-full my-2",
    twoCols:"grid grid-cols-1fr1fr",
}

const statusClass = (order:TypeOrder)=>{
    if(order.status==="Cancelled"){
        return "text-lg text-red-600"
    }
    else if(order.status==="Pending"){
        return "text-lg text-yellow-600"
    }
    else if(order.status==="Served"){
        return "text-lg text-green-600"
    }
    else if(order.status==="Started"){
        return "text-lg text-indigo-600"
    }
}

export default function OrderModal({order,onClose=()=>{}}:TypeOrderModal){
    const {secs,minutes} = useTimeCounter(parseInt(order.timeElapsed));
    const className="w-24";
    const actions:TypeButton[] = [];
    if(order.status==="Pending"){
        actions.push({children:"Start", color:"warning", className});
    }else if(order.status==="Started"){
        actions.push({children:"Ready",color:"success", className});
    }
    return(
        <BaseModal
            onClose={onClose}
            headerSection={
                <div className="flex items-center justify-start gap-4">
                    <p className="text-xl text-indigo-600 font-bold">Order</p>
                    <p className="text-gray-600">{order.id}</p>
                </div>
            }
            actions={actions}
        >
            <div>
                <div className={classes.twoCols + " mb-3"}>
                    <div className={classes.container}>
                        <p className={classes.headerText}>Status</p>
                        <p className={statusClass(order)}>{order.status}</p>
                    </div>
                    <div className={classes.container}>
                        <p className={classes.headerText}>Time Elapsed</p>
                        <p className={classes.text}>{minutes} Mins - {secs} Secs</p>
                    </div>
                </div>
                <div className={classes.twoCols + " mb-3"}>
                    <div className={classes.container}>
                        <p className={classes.headerText}>Total Cost</p>
                        <p className={classes.text}>{order.totalCost}</p>
                    </div>
                    <div className={classes.container}>
                        <p className={classes.headerText}>Table Number</p>
                        <p className={classes.text}>{order.tableNumber}</p>
                    </div>
                </div>
                <div className={classes.container + " max-w-md"}>
                    <p className={classes.headerText}>Order Items</p>
                    {order.items.map((orderItem)=>(
                        <OrderItem {...orderItem} key={orderItem.name}/>
                    ))}
                </div>
            </div>
        </BaseModal>
    );    
}

function OrderItem(props:TypeItem){
    return(
        <div className="
            flex justify-between items-center w-full px-4 pr-12
            bg-gray-100 rounded-lg m-2 py-2 cursor-default
            hover:bg-gray-200 transition-all
        ">
            <div className="flex justify-start items-center gap-6">
                <Image 
                    src={baseURL+props.img} 
                    alt={props.name} 
                    width={70} 
                    height={70}
                    className="h-16 w-16 object-cover rounded-full ring-2 ring-indigo-600/30"
                />
                <div className="flex flex-col justify-center">
                    <p className="text-indigo-600 text-lg font-semibold">{props.name}</p>
                    <p className="text-gray-600 text-lg">{props.cost.toFixed(2)} ETB</p>
                </div>
            </div>
            <p className="text-2xl text-gray-600 font-bold">{props.amount}</p>
        </div>
    );
}
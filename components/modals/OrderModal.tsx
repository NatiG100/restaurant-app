import Image from "next/image";
import { TypeItem, TypeOrder } from "../TableComponents/order";
import BaseModal from "./BaseModal";

export interface TypeOrderModal{
    order:TypeOrder,
    onClose?:()=>void,
}

const classes = {
    headerText:{
        className:""
    },
    text:{
        className:""
    },
    container:{
        className:""
    }
}
export default function OrderModal({order,onClose=()=>{}}:TypeOrderModal){
    return(
        <BaseModal
            onClose={onClose}
            headerSection={
                <div className="flex items-center justify-start gap-4">
                    <p className="text-xl text-indigo-600 font-bold">Order</p>
                    <p className="text-gray-600">{order._id}</p>
                </div>
            }
            actions={[]}
        >
            <div>
                <p>Order Items</p>
                {order.items.map((orderItem)=>(
                    <OrderItem {...orderItem} key={orderItem.name}/>
                ))}
            </div>
        </BaseModal>
    );    
}

function OrderItem(props:TypeItem){
    return(
        <div className="
            flex justify-between items-center w-full px-4 pr-12
            bg-gray-100 rounded-lg m-2 py-4 cursor-default
            hover:bg-gray-200 transition-all
        ">
            <div className="flex justify-start items-center gap-6">
                <Image 
                    src={props.img} 
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
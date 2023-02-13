import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypeDrink } from "../components/TableComponents/drinks";
import { TypeItem } from "../components/TableComponents/order";

export interface TypeItemContext {
    img:string,
    name:string,
    description:string,
    cost:number,
    id:string,
    type:"food"|"drink",
}

type CartSliceType = {
    items:{item:TypeItemContext,count:number}[],
    totalCost:number,
}

const initialState:CartSliceType = {items:[],totalCost:0}


export const CartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addItem:(state,action:PayloadAction<TypeItemContext>)=>{
            //assume the food is not in the state and set food posititon to -1
            let itemPos = -1;
            state.items.forEach((item,index)=>{
                //if the food is in the state store it's index in food position
                if(item.item.id===action.payload.id){
                    itemPos = index;
                }
            });

            let items = [...state.items];
            //if the food was found increment it's quantity
            if(itemPos!==-1){
                items[itemPos].count +=1;
            }
            //if the food was not found push it
            else{
                items.push({item:action.payload,count:1});
            }
            //update the state including the total cost
            let newState={...state,items,totalCost:state.totalCost+action.payload.cost}
            return newState;
        },
        subtractItem:(state,action:PayloadAction<TypeItemContext>)=>{
            //assume the food is not in the state and set food posititon to -1
            let itemPos = -1;
            state.items.forEach((item,index)=>{
                //if the food is in the state store it's index in food position
                if(item.item.id===action.payload.id){
                    itemPos = index;
                }
            });
            let items =[...state.items];
            //decrement the food quantity
            items[itemPos].count -=1;
            //if the quantity is 0 remove it from the array
            if(items[itemPos].count===0) {items.splice(itemPos,itemPos)};

            //update the state including the total cost
            let newState={...state,items,totalCost:state.totalCost-action.payload.cost}
            return newState;
        },
    }
});

export const {
    addItem,
    subtractItem,
} = CartSlice.actions;

export default CartSlice.reducer;
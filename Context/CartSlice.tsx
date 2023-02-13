import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypeDrink } from "../components/TableComponents/drinks";
import { TypeFood } from "../components/TableComponents/foods";
import Foods from "../pages/client/foods";

type CartSliceType = {
    foods:{food:TypeFood,count:number}[],
    drinks:{drink:TypeDrink,count:number}[],
    totalCost:number,
}

const initialState:CartSliceType = {drinks:[],foods:[],totalCost:0}


export const CartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addFood:(state,action:PayloadAction<TypeFood>)=>{
            let foodPos = -1;
            state.foods.forEach((food,index)=>{
                if(food.food.id===action.payload.id){
                    foodPos = index;
                }
            });
            let foods = [...state.foods];
            if(foodPos!==-1){
                foods[foodPos].count +=1;
            }else{
                let foods = [...state.foods];
                foods.push({food:action.payload,count:1});
            }
            let newState={...state,foods,totalCost:state.totalCost+state.foods[foodPos].food.cost}
            return newState;
        }
    }
})
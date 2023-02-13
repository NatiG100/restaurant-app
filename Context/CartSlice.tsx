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
            //assume the food is not in the state and set food posititon to -1
            let foodPos = -1;
            state.foods.forEach((food,index)=>{
                //if the food is in the state store it's index in food position
                if(food.food.id===action.payload.id){
                    foodPos = index;
                }
            });

            let foods = [...state.foods];
            //if the food was found increment it's quantity
            if(foodPos!==-1){
                foods[foodPos].count +=1;
            }
            //if the food was not found push it
            else{
                let foods = [...state.foods];
                foods.push({food:action.payload,count:1});
            }
            //update the state including the total cost
            let newState={...state,foods,totalCost:state.totalCost+action.payload.cost}
            return newState;
        },
        subtractFood:(state,action:PayloadAction<TypeFood>)=>{
            //assume the food is not in the state and set food posititon to -1
            let foodPos = -1;
            state.foods.forEach((food,index)=>{
                //if the food is in the state store it's index in food position
                if(food.food.id===action.payload.id){
                    foodPos = index;
                }
            });
            let foods = [...state.foods];
            //decrement the food quantity
            foods[foodPos].count -=1;
            //if the quantity is 0 remove it from the array
            if(foods[foodPos].count===0) {foods.splice(foodPos,foodPos)};

            //update the state including the total cost
            let newState={...state,foods,totalCost:state.totalCost-action.payload.cost}
            return newState;
        },
    }
})
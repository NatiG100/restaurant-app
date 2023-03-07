import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartSliceType = {
    tableId:string|null
}

const initialState:CartSliceType = {tableId:null}


export const TableNumberSlice = createSlice({
    name:'tableId',
    initialState,
    reducers:{
        setTableNumber:(state,action:PayloadAction<CartSliceType>)=>{
            return {...action.payload};
        },
    }
});

export const {
    setTableNumber
} = TableNumberSlice.actions;

export default TableNumberSlice.reducer;
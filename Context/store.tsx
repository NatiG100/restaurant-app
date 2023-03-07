import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from './AuthSlice';
import CartReducer from './CartSlice';
import TableNumberSlice from "./TableNumberSlice";

const store =  configureStore({
    reducer:{
        auth:AuthReducer,
        cart:CartReducer,
        tableNumber:TableNumberSlice,
    }
});

export type RootState = ReturnType<typeof store.getState>;

export default store;

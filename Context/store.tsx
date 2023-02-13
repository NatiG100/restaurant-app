import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from './AuthSlice';
import CartReducer from './CartSlice';

const store =  configureStore({
    reducer:{
        auth:AuthReducer,
        cart:CartReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;

export default store;

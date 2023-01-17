import {createSlice} from '@reduxjs/toolkit';

export const AuthSlice = createSlice({
    name:'auth',
    initialState:{
        user:null
    },
    reducers:{
        login:(state,action)=>{
            state.user = action.payload
        },
        logout:(state)=>{
            state.user = null
        }
    }
});

export const {
    login,
    logout,
} = AuthSlice.actions;

export default AuthSlice.reducer;
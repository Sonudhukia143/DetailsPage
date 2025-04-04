import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser:null,
    loading:false,
    error:null
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state) => {
            state.loading = true;
        },
        signInSuccess:(state,action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInError:(state,action) => {
            state.error = action.payload;
            state.loading = false;
        },
        logout: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        }
    }
});

export const {signInStart,signInSuccess,signInError,logout} = userSlice.actions;

export default userSlice.reducer;
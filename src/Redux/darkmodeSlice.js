import { createSlice } from "@reduxjs/toolkit";

const darkSlice=createSlice({
    name:"mode",
    initialState:{
        modestatus:false
    },
    reducers:{
        darkmode:(state)=>{
            state.modestatus= !state.modestatus;

        }
    }
})
export const {darkmode } = darkSlice.actions;
export default darkSlice.reducer;
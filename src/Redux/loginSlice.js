import { createSlice } from "@reduxjs/toolkit";

const loginSlice=createSlice({
    name:"login",
    initialState:{
        loginstate:false,
        userid:""
    },
    reducers:{
        setLogin: (state)=>{
            state.loginstate = true;
        },
        setUserId:(state,action)=>{
            state.userid=action.payload
        },
        removelogin:(state)=>{
            state.loginstate=false
        },
        removeuserId:(state)=>{
            state.userid=""
        }
    }

})
export const{setLogin,setUserId,removelogin,removeuserId}=loginSlice.actions
export default loginSlice.reducer
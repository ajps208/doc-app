import { createSlice } from "@reduxjs/toolkit";
import { Firebase } from "../Firebase/config";
import { FirebaseAuth } from "../Firebase/config";
import { Firestore } from "../Firebase/config";
const firebaseslice=createSlice({
    name:"firebase",
    initialState:{
        Firebase,
        FirebaseAuth,
        Firestore
    }
   
})
// export const {darkmode } = darkSlice.actions;
export default firebaseslice.reducer;
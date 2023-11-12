import {configureStore} from "@reduxjs/toolkit"
import darkmodeSlice from "./darkmodeSlice"
import firebaseSlice from "./firebaseSlice"
import loginSlice from "./loginSlice"

export const store=configureStore({
    reducer:{
        darkmode:darkmodeSlice,
        firebaseSlice,
        loginSlice
    }
})

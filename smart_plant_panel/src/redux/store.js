import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from "./LoginReducer";
import NurseryReducer from "./NurseryReducer";

const store = configureStore({
    reducer: {
        user: LoginReducer,
        nursery: NurseryReducer,
    }
})

export default store;

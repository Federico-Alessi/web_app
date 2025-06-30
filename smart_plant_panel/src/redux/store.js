import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from "./LoginReducer";

const store = configureStore({
    reducer: {
        user: LoginReducer,
    }
})

export default store;

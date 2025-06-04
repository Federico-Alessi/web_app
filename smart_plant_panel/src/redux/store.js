import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import LoginReducer from "./LoginReducer";

// Persist configuration
const persistConfig = {
    key: "root",
    storage,
}
const persistedReducer = persistReducer(persistConfig, LoginReducer);

const store = configureStore({
    reducer: {
        user: persistedReducer,
    }
})

export default store;
export const persistor = persistStore(store);
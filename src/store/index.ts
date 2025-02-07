import {combineReducers, configureStore} from "@reduxjs/toolkit";
import ProductsReducer from "./slices/goodsReducer";
import CategoriesReducer from "./slices/categoriesReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root", // Ключ для хранения состояния
    storage, // Используем localStorage
};

const rootReducer = combineReducers({
    products: ProductsReducer,
    categories: CategoriesReducer,
});


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer
})

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


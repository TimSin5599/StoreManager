import {combineReducers, configureStore} from "@reduxjs/toolkit";
import ProductsReducer from "./slices/goodsReducer";
import CategoriesReducer from "./slices/categoriesReducer";

const rootReducer = combineReducers({
    products: ProductsReducer,
    categories: CategoriesReducer,
});

export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


import {configureStore} from "@reduxjs/toolkit";
import ProductsReducer from "./slices/goodsReducer";
import CategoriesReducer from "./slices/categoriesReducer";

export const store = configureStore({
    reducer: {
        products: ProductsReducer,
        // categories: CategoriesReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


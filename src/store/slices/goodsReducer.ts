import {Product} from "../../components/Good/GoodCard.tsx";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { v4 } from "uuid";
import {products} from "../../data/products.tsx";
import {removeCategoryFromProducts} from "./categoriesReducer.ts";

const initializeProducts = products.map((product) => ({
    ...product,
    id: v4(),
}));

type ProductsState = Product[];

const initialState: ProductsState = initializeProducts;

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<Product>) => {
            state.push(action.payload);
        },
        removeProduct: (state, action: PayloadAction<string>) => {
            return state.filter(product => product.id !== action.payload);
        },
        changeGood: (state, action: PayloadAction<Product>) => {
            const index = state.findIndex(product => product.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(removeCategoryFromProducts, (state, action: PayloadAction<string>) => {
             state.forEach((product) => {
                    if (product.category === action.payload) {
                        product.category = null;
                    }
             });
        })
    }
})

export default productsSlice.reducer;
export const {addProduct, removeProduct, changeGood} = productsSlice.actions;
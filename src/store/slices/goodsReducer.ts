import {Product} from "../../components/Good/GoodCard.tsx";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addProduct, fetchProducts, removeProduct, updateProduct} from "../../components/api/goodApi.ts";

type ProductsState = {
    products: Product[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
};

const initialState: ProductsState = {
    products: [],
    status: 'idle',
    error: null,
}

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setStatus: (state, action: PayloadAction<'idle' | 'loading' | 'succeeded' | 'failed'>) => {
            state.status = action.payload;
        },
        clearAll: (state) => {
            state.status = 'idle';
        },
        removeCategoryFromProducts: (state, action: PayloadAction<number>) => {
            state.products.forEach((product) => {
                if (product.category_id === action.payload) {
                    product.category_id = 0;
                }
            });
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch Products
            .addCase(fetchProducts.pending, (state) => {
                state.status = "loading"
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.status = "succeeded"
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Ошибка';
            })

            // Add Product
            .addCase(addProduct.fulfilled, (state, action: PayloadAction<Product>) => {
                state.products.push(action.payload as Product);
            })

            // Remove Product
            .addCase(removeProduct.fulfilled, (state, action: PayloadAction<{id: number}>) => {
                state.products = state.products.filter((product) => product.id !== action.payload.id);
            })
            .addCase(removeProduct.rejected, (_ , action) => {
                console.log(action.error.message);
            })

            //Update Product
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.products.findIndex((product) => product.id === action.payload.id);

                if (index !== -1) {
                    state.products[index] = action.payload;
                }
            })
    },
})

export default productsSlice.reducer;
export const {setStatus, clearAll, removeCategoryFromProducts} = productsSlice.actions;
import {createAsyncThunk} from "@reduxjs/toolkit";
import {Product} from "../Good/GoodCard.tsx";
import {newProductState} from "../Good/AddModalDialog.tsx";

export const fetchProducts = createAsyncThunk<Product[]>('products/fetchProducts',
    async () => {
        const response = await fetch('http://localhost:3000/api/products/', {
            method: "GET",
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }

        return await response.json();
});

export const addProduct = createAsyncThunk('products/addProduct',
    async (newProduct: newProductState) => {
        const response = await fetch('http://localhost:3000/api/products/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProduct),
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }

        const savedProduct: Product = await response.json();
        return savedProduct;
    }
);

export const removeProduct = createAsyncThunk('products/removeProduct',
    async (id: number) => {

        const response = await fetch(`http://localhost:3000/api/products/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }

        const message: string = await response.json();
        console.log(message)

        return {id};
    }
);

export const updateProduct = createAsyncThunk('products/updateProduct',
    async (product: Product) => {

        const response = await fetch(`http://localhost:3000/api/products/${product.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product),
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }

        const message:{message: string, product: Product} = await response.json();
        console.log(message.message)

        return message.product;
    }
);